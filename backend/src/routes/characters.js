const express = require('express');
const router = express.Router();
const { 
  createCharacter, 
  getCharacters, 
  getCharacter, 
  updateCharacter, 
  deleteCharacter 
} = require('../controllers/characterController');

// Create new character
router.post('/', createCharacter);

// Get all characters for user
router.get('/', getCharacters);

// Get single character
router.get('/:id', getCharacter);

// Update character
router.put('/:id', updateCharacter);

// Delete character
router.delete('/:id', deleteCharacter);

module.exports = router;
