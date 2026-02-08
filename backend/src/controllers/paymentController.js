const { db } = require('../config/firebase');
const { 
  createOrder, 
  verifyPaymentSignature, 
  calculateCredits,
  CREDITS_PER_RUPEE 
} = require('../config/razorpay');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * Create Razorpay payment order
 */
const createPaymentOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.uid;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  // Minimum amount check (₹1)
  if (amount < 1) {
    return res.status(400).json({ error: 'Minimum amount is ₹1' });
  }

  // Maximum amount check (₹100,000)
  if (amount > 100000) {
    return res.status(400).json({ error: 'Maximum amount is ₹100,000' });
  }

  const credits = calculateCredits(amount);

  // Create Razorpay order
  const order = await createOrder(amount);

  // Store pending payment
  await db.collection('payments').add({
    userId,
    orderId: order.id,
    amount,
    credits,
    status: 'pending',
    createdAt: new Date().toISOString()
  });

  res.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    credits,
    conversionRate: CREDITS_PER_RUPEE
  });
});

/**
 * Verify payment and add credits
 */
const verifyPayment = asyncHandler(async (req, res) => {
  const { orderId, paymentId, signature } = req.body;
  const userId = req.user.uid;

  if (!orderId || !paymentId || !signature) {
    return res.status(400).json({ error: 'Missing payment details' });
  }

  // Verify signature
  const isValid = verifyPaymentSignature(orderId, paymentId, signature);

  if (!isValid) {
    return res.status(400).json({ 
      error: 'Invalid payment signature',
      message: 'Payment verification failed'
    });
  }

  // Get payment record
  const paymentsSnapshot = await db.collection('payments')
    .where('orderId', '==', orderId)
    .where('userId', '==', userId)
    .limit(1)
    .get();

  if (paymentsSnapshot.empty) {
    return res.status(404).json({ error: 'Payment record not found' });
  }

  const paymentDoc = paymentsSnapshot.docs[0];
  const paymentData = paymentDoc.data();

  // Check if already processed
  if (paymentData.status === 'completed') {
    return res.status(400).json({ 
      error: 'Payment already processed',
      credits: paymentData.credits
    });
  }

  // Update payment status
  await paymentDoc.ref.update({
    status: 'completed',
    paymentId,
    signature,
    completedAt: new Date().toISOString()
  });

  // Add credits to user
  const userRef = db.collection('users').doc(userId);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    return res.status(404).json({ error: 'User not found' });
  }

  const userData = userDoc.data();
  const currentCredits = userData.credits || 0;
  const newCredits = currentCredits + paymentData.credits;

  await userRef.update({
    credits: newCredits,
    updatedAt: new Date().toISOString()
  });

  // Log transaction
  await db.collection('transactions').add({
    userId,
    type: 'credit',
    amount: paymentData.credits,
    reason: 'payment',
    paymentId,
    orderId,
    amountPaid: paymentData.amount,
    timestamp: new Date().toISOString()
  });

  res.json({
    message: 'Payment verified successfully',
    creditsAdded: paymentData.credits,
    totalCredits: newCredits,
    amount: paymentData.amount
  });
});

/**
 * Get payment history
 */
const getPaymentHistory = asyncHandler(async (req, res) => {
  const userId = req.user.uid;

  const paymentsSnapshot = await db.collection('payments')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .limit(50)
    .get();

  const payments = [];
  paymentsSnapshot.forEach(doc => {
    const data = doc.data();
    payments.push({
      id: doc.id,
      orderId: data.orderId,
      amount: data.amount,
      credits: data.credits,
      status: data.status,
      createdAt: data.createdAt,
      completedAt: data.completedAt
    });
  });

  res.json({ payments });
});

module.exports = {
  createPaymentOrder,
  verifyPayment,
  getPaymentHistory
};
