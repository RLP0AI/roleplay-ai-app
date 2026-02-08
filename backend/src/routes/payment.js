const express = require('express');
const router = express.Router();
const { 
  createPaymentOrder, 
  verifyPayment,
  getPaymentHistory 
} = require('../controllers/paymentController');

// Create payment order
router.post('/create-order', createPaymentOrder);

// Verify payment and add credits
router.post('/verify', verifyPayment);

// Get payment history
router.get('/history', getPaymentHistory);

module.exports = router;
