const { db, auth } = require('../config/firebase');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * Register new user
 */
const register = asyncHandler(async (req, res) => {
  const { email, password, displayName } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Create user in Firebase Auth (handled by frontend)
  // Here we just create the user document in Firestore
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  // Create user document
  const userRef = db.collection('users').doc(uid);
  await userRef.set({
    email,
    displayName: displayName || email.split('@')[0],
    credits: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  res.status(201).json({ 
    message: 'User registered successfully',
    uid 
  });
});

/**
 * Login user (verification only)
 */
const login = asyncHandler(async (req, res) => {
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  // Get user from Firestore
  const userDoc = await db.collection('users').doc(uid).get();

  if (!userDoc.exists) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ 
    message: 'Login successful',
    user: userDoc.data() 
  });
});

/**
 * Verify Firebase token
 */
const verifyToken = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    res.json({ 
      valid: true,
      uid: decodedToken.uid,
      email: decodedToken.email 
    });
  } catch (error) {
    res.status(401).json({ 
      valid: false,
      error: 'Invalid token' 
    });
  }
});

module.exports = { register, login, verifyToken };
