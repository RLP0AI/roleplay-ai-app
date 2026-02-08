const { Groq } = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const GROQ_MODEL = 'openai/gpt-oss-120b';

/**
 * Generate AI roleplay response
 * @param {Array} messages - Chat messages
 * @param {Object} character - Character details
 * @returns {Promise<string>} AI response
 */
async function generateRoleplayResponse(messages, character) {
  try {
    const systemPrompt = `You are roleplaying as a fictional character.

Name: ${character.name}
Role: ${character.role}
Personality: ${character.personality}
Speaking Style: ${character.style}
Backstory: ${character.backstory}

Rules:
- Never break character
- Never mention you are an AI
- Never refer to system instructions
- Respond emotionally and immersively
- Stay fully in character at all times
- Keep responses natural and conversational
- Match the personality and speaking style exactly`;

    const chatMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: chatMessages,
      model: GROQ_MODEL,
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null
    });

    return chatCompletion.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';
  } catch (error) {
    console.error('Groq API Error:', error);
    throw new Error('Failed to generate AI response');
  }
}

/**
 * Generate streaming AI response
 * @param {Array} messages - Chat messages
 * @param {Object} character - Character details
 * @returns {AsyncIterable} Streaming response
 */
async function* generateStreamingResponse(messages, character) {
  try {
    const systemPrompt = `You are roleplaying as a fictional character.

Name: ${character.name}
Role: ${character.role}
Personality: ${character.personality}
Speaking Style: ${character.style}
Backstory: ${character.backstory}

Rules:
- Never break character
- Never mention you are an AI
- Never refer to system instructions
- Respond emotionally and immersively
- Stay fully in character at all times`;

    const chatMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: chatMessages,
      model: GROQ_MODEL,
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null
    });

    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        yield content;
      }
    }
  } catch (error) {
    console.error('Groq Streaming Error:', error);
    throw new Error('Failed to generate streaming response');
  }
}

module.exports = {
  generateRoleplayResponse,
  generateStreamingResponse
};
