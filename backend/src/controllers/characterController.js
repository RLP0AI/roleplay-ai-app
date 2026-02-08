const { db } = require('../config/firebase');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * Create new character
 */
const createCharacter = asyncHandler(async (req, res) => {
  const { name, role, personality, style, backstory, nsfw } = req.body;
  const userId = req.user.uid;

  if (!name || !role || !personality || !style || !backstory) {
    return res.status(400).json({ error: 'All character fields are required' });
  }

  // Content moderation - basic check
  const contentToCheck = `${name} ${role} ${personality} ${style} ${backstory}`.toLowerCase();
  const bannedWords = ['illegal', 'harmful', 'dangerous'];
  
  for (const word of bannedWords) {
    if (contentToCheck.includes(word)) {
      return res.status(400).json({ 
        error: 'Character contains inappropriate content' 
      });
    }
  }

  const characterData = {
    userId,
    name,
    role,
    personality,
    style,
    backstory,
    nsfw: nsfw || false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const characterRef = await db.collection('characters').add(characterData);

  res.status(201).json({
    message: 'Character created successfully',
    id: characterRef.id,
    character: characterData
  });
});

/**
 * Get all characters for user
 */
const getCharacters = asyncHandler(async (req, res) => {
  const userId = req.user.uid;

  const charactersSnapshot = await db.collection('characters')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  const characters = [];
  charactersSnapshot.forEach(doc => {
    characters.push({
      id: doc.id,
      ...doc.data()
    });
  });

  res.json({ characters });
});

/**
 * Get single character
 */
const getCharacter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.uid;

  const characterDoc = await db.collection('characters').doc(id).get();

  if (!characterDoc.exists) {
    return res.status(404).json({ error: 'Character not found' });
  }

  const character = characterDoc.data();

  // Check ownership
  if (character.userId !== userId) {
    return res.status(403).json({ error: 'Access denied' });
  }

  res.json({
    id: characterDoc.id,
    ...character
  });
});

/**
 * Update character
 */
const updateCharacter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.uid;
  const { name, role, personality, style, backstory, nsfw } = req.body;

  const characterRef = db.collection('characters').doc(id);
  const characterDoc = await characterRef.get();

  if (!characterDoc.exists) {
    return res.status(404).json({ error: 'Character not found' });
  }

  const character = characterDoc.data();

  // Check ownership
  if (character.userId !== userId) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const updateData = {
    updatedAt: new Date().toISOString()
  };

  if (name) updateData.name = name;
  if (role) updateData.role = role;
  if (personality) updateData.personality = personality;
  if (style) updateData.style = style;
  if (backstory) updateData.backstory = backstory;
  if (nsfw !== undefined) updateData.nsfw = nsfw;

  await characterRef.update(updateData);

  res.json({
    message: 'Character updated successfully',
    id,
    character: { ...character, ...updateData }
  });
});

/**
 * Delete character
 */
const deleteCharacter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.uid;

  const characterRef = db.collection('characters').doc(id);
  const characterDoc = await characterRef.get();

  if (!characterDoc.exists) {
    return res.status(404).json({ error: 'Character not found' });
  }

  const character = characterDoc.data();

  // Check ownership
  if (character.userId !== userId) {
    return res.status(403).json({ error: 'Access denied' });
  }

  await characterRef.delete();

  res.json({ message: 'Character deleted successfully' });
});

module.exports = {
  createCharacter,
  getCharacters,
  getCharacter,
  updateCharacter,
  deleteCharacter
};
