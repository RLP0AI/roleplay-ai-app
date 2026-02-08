const express = require('express');
const router = express.Router();
const { getCredits, getTransactionHistory } = require('../controllers/creditController');

// Get user credits
router.get('/', getCredits);

// Get transaction history
router.get('/transactions', getTransactionHistory);

module.exports = router;
