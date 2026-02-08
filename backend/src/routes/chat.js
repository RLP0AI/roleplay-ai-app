const express = require('express');
const router = express.Router();
const { 
  sendMessage, 
  getChatHistory,
  createChat,
  deleteChat
} = require('../controllers/chatController');

// Create new chat
router.post('/create', createChat);

// Send message
router.post('/message', sendMessage);

// Get chat history
router.get('/:characterId', getChatHistory);

// Delete chat
router.delete('/:chatId', deleteChat);

module.exports = router;
