const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Credit conversion rate: ₹1 = 15 credits
const CREDITS_PER_RUPEE = 15;

/**
 * Create Razorpay order
 * @param {number} amount - Amount in rupees
 * @returns {Promise<Object>} Order details
 */
async function createOrder(amount) {
  try {
    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        description: 'Credit purchase for roleplay AI'
      }
    };

    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error('Razorpay Order Creation Error:', error);
    throw new Error('Failed to create payment order');
  }
}

/**
 * Verify Razorpay payment signature
 * @param {string} orderId - Order ID
 * @param {string} paymentId - Payment ID
 * @param {string} signature - Razorpay signature
 * @returns {boolean} Verification result
 */
function verifyPaymentSignature(orderId, paymentId, signature) {
  const crypto = require('crypto');
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === signature;
}

/**
 * Calculate credits from amount
 * @param {number} amount - Amount in rupees
 * @returns {number} Credits
 */
function calculateCredits(amount) {
  return Math.floor(amount * CREDITS_PER_RUPEE);
}

module.exports = {
  razorpay,
  createOrder,
  verifyPaymentSignature,
  calculateCredits,
  CREDITS_PER_RUPEE
};
