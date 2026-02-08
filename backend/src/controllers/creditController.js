const { db } = require('../config/firebase');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * Get user credits
 */
const getCredits = asyncHandler(async (req, res) => {
  const userId = req.user.uid;

  const userDoc = await db.collection('users').doc(userId).get();

  if (!userDoc.exists) {
    return res.status(404).json({ error: 'User not found' });
  }

  const userData = userDoc.data();

  res.json({
    credits: userData.credits || 0,
    email: userData.email
  });
});

/**
 * Get transaction history
 */
const getTransactionHistory = asyncHandler(async (req, res) => {
  const userId = req.user.uid;
  const { limit = 50 } = req.query;

  const transactionsSnapshot = await db.collection('transactions')
    .where('userId', '==', userId)
    .orderBy('timestamp', 'desc')
    .limit(parseInt(limit))
    .get();

  const transactions = [];
  transactionsSnapshot.forEach(doc => {
    transactions.push({
      id: doc.id,
      ...doc.data()
    });
  });

  res.json({ transactions });
});

module.exports = {
  getCredits,
  getTransactionHistory
};
