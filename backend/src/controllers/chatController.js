const { db } = require('../config/firebase');
const { generateRoleplayResponse } = require('../config/groq');
const { asyncHandler } = require('../middleware/errorHandler');

// Credit cost per message
const CREDITS_PER_MESSAGE = 1;
const MAX_MESSAGE_LENGTH = 2000;

/**
 * Create new chat session
 */
const createChat = asyncHandler(async (req, res) => {
  const { characterId } = req.body;
  const userId = req.user.uid;

  if (!characterId) {
    return res.status(400).json({ error: 'Character ID is required' });
  }

  // Verify character exists and belongs to user
  const characterDoc = await db.collection('characters').doc(characterId).get();
  
  if (!characterDoc.exists) {
    return res.status(404).json({ error: 'Character not found' });
  }

  const character = characterDoc.data();
  
  if (character.userId !== userId) {
    return res.status(403).json({ error: 'Access denied' });
  }

  // Create chat document
  const chatData = {
    userId,
    characterId,
    characterName: character.name,
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const chatRef = await db.collection('chats').add(chatData);

  res.status(201).json({
    message: 'Chat created successfully',
    chatId: chatRef.id,
    chat: chatData
  });
});

/**
 * Send message and get AI response
 */
const sendMessage = asyncHandler(async (req, res) => {
  const { characterId, message, chatId } = req.body;
  const userId = req.user.uid;

  if (!characterId || !message) {
    return res.status(400).json({ error: 'Character ID and message are required' });
  }

  // Validate message length
  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ 
      error: `Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters allowed.` 
    });
  }

  // Get user and check credits
  const userRef = db.collection('users').doc(userId);
  const userDoc = await userRef.get();
  
  if (!userDoc.exists) {
    return res.status(404).json({ error: 'User not found' });
  }

  const userData = userDoc.data();
  
  if (userData.credits < CREDITS_PER_MESSAGE) {
    return res.status(402).json({ 
      error: 'Insufficient credits',
      message: 'Please purchase more credits to continue chatting',
      creditsRequired: CREDITS_PER_MESSAGE,
      currentCredits: userData.credits
    });
  }

  // Get character
  const characterDoc = await db.collection('characters').doc(characterId).get();
  
  if (!characterDoc.exists) {
    return res.status(404).json({ error: 'Character not found' });
  }

  const character = characterDoc.data();
  
  if (character.userId !== userId) {
    return res.status(403).json({ error: 'Access denied' });
  }

  // Get or create chat
  let chatRef;
  let chatData;
  
  if (chatId) {
    chatRef = db.collection('chats').doc(chatId);
    const chatDoc = await chatRef.get();
    
    if (!chatDoc.exists) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    
    chatData = chatDoc.data();
    
    if (chatData.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }
  } else {
    // Create new chat
    const newChatData = {
      userId,
      characterId,
      characterName: character.name,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    chatRef = await db.collection('chats').add(newChatData);
    chatData = newChatData;
  }

  // Add user message
  const userMessage = {
    role: 'user',
    content: message,
    timestamp: new Date().toISOString()
  };

  // Prepare messages for AI
  const messages = [
    ...(chatData.messages || []).map(m => ({ role: m.role, content: m.content })),
    { role: 'user', content: message }
  ];

  // Generate AI response
  let aiResponse;
  try {
    aiResponse = await generateRoleplayResponse(messages, character);
  } catch (error) {
    console.error('AI Generation Error:', error);
    return res.status(500).json({ 
      error: 'Failed to generate response',
      message: 'Please try again later'
    });
  }

  // Add AI message
  const aiMessage = {
    role: 'assistant',
    content: aiResponse,
    timestamp: new Date().toISOString()
  };

  // Update chat with new messages
  const updatedMessages = [
    ...(chatData.messages || []),
    userMessage,
    aiMessage
  ];

  await chatRef.update({
    messages: updatedMessages,
    updatedAt: new Date().toISOString()
  });

  // Deduct credits (IMPORTANT: After successful response)
  const newCredits = userData.credits - CREDITS_PER_MESSAGE;
  await userRef.update({
    credits: newCredits,
    updatedAt: new Date().toISOString()
  });

  // Log transaction
  await db.collection('transactions').add({
    userId,
    type: 'debit',
    amount: CREDITS_PER_MESSAGE,
    reason: 'chat_message',
    characterId,
    chatId: chatRef.id,
    timestamp: new Date().toISOString()
  });

  res.json({
    message: 'Message sent successfully',
    userMessage,
    aiMessage,
    creditsRemaining: newCredits,
    creditsDeducted: CREDITS_PER_MESSAGE,
    chatId: chatRef.id
  });
});

/**
 * Get chat history for a character
 */
const getChatHistory = asyncHandler(async (req, res) => {
  const { characterId } = req.params;
  const userId = req.user.uid;

  const chatsSnapshot = await db.collection('chats')
    .where('userId', '==', userId)
    .where('characterId', '==', characterId)
    .orderBy('updatedAt', 'desc')
    .limit(10)
    .get();

  const chats = [];
  chatsSnapshot.forEach(doc => {
    chats.push({
      id: doc.id,
      ...doc.data()
    });
  });

  res.json({ chats });
});

/**
 * Delete chat
 */
const deleteChat = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const userId = req.user.uid;

  const chatRef = db.collection('chats').doc(chatId);
  const chatDoc = await chatRef.get();

  if (!chatDoc.exists) {
    return res.status(404).json({ error: 'Chat not found' });
  }

  const chat = chatDoc.data();

  if (chat.userId !== userId) {
    return res.status(403).json({ error: 'Access denied' });
  }

  await chatRef.delete();

  res.json({ message: 'Chat deleted successfully' });
});

module.exports = {
  sendMessage,
  getChatHistory,
  createChat,
  deleteChat
};
