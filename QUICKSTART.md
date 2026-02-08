# 🚀 Quick Start Guide

Get your Roleplay AI application running in 5 minutes!

## Prerequisites Check

Make sure you have:
- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Firebase account created
- [ ] Groq API key obtained
- [ ] Razorpay account created (or use test mode)

## Step 1: Firebase Setup (5 minutes)

1. Go to https://console.firebase.google.com/
2. Click "Create Project"
3. Enable these services:
   - **Authentication** → Email/Password + Google Sign-in
   - **Firestore Database** → Create in production mode
4. Register a web app:
   - Click "Add app" → Web
   - Copy the configuration (keep this tab open)
5. Download service account key:
   - Project Settings → Service Accounts
   - Click "Generate new private key"
   - Save as `serviceAccountKey.json`

## Step 2: Get API Keys (3 minutes)

### Groq API
1. Visit: https://console.groq.com/
2. Sign up/login
3. Go to API Keys → Create API Key
4. Copy the key

### Razorpay (Optional for testing)
1. Visit: https://dashboard.razorpay.com/
2. Sign up/login
3. Switch to Test Mode
4. Settings → API Keys → Generate Test Keys
5. Copy Key ID and Secret

## Step 3: Backend Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file
# Windows: notepad .env
# Mac/Linux: nano .env
```

**Paste these values in .env:**
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json
FIREBASE_DATABASE_URL=https://YOUR-PROJECT.firebaseio.com

GROQ_API_KEY=your_groq_api_key_here

RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
```

**Place your Firebase service account JSON file:**
- Copy `serviceAccountKey.json` to the `backend/` directory

## Step 4: Frontend Setup (2 minutes)

```bash
# Navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Edit .env.local file
# Windows: notepad .env.local
# Mac/Linux: nano .env.local
```

**Paste these values in .env.local:**
```env
# From Firebase Console
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_test_key_id
```

## Step 5: Run the Application (1 minute)

### Start Backend (Terminal 1):
```bash
cd backend
npm start
```

You should see:
```
🚀 Server running on port 5000
🌍 Environment: development
```

### Start Frontend (Terminal 2):
```bash
cd frontend
npm run dev
```

You should see:
```
ready - started server on 0.0.0.0:3000
```

## Step 6: Test the Application

1. Open browser: http://localhost:3000
2. Click "Sign Up"
3. Create an account
4. Create a character
5. Try chatting (requires credits)

## 🎉 Success!

Your Roleplay AI application is now running!

## 🧪 Test Payment Flow

Use Razorpay test cards:
- **Card Number:** 4111 1111 1111 1111
- **Expiry:** Any future date
- **CVV:** Any 3 digits
- **Name:** Test User

## ⚠️ Common Issues

### Port Already in Use
```bash
# Kill process on port 5000
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -ti:5000 | xargs kill
```

### Firebase Error
- Double-check all Firebase config values
- Ensure Authentication and Firestore are enabled
- Verify service account key is in correct location

### Groq API Error
- Verify API key is correct
- Check for rate limits
- Ensure you have credits in Groq account

### Payment Not Working
- Verify you're in Test Mode
- Check Razorpay key ID matches
- Use test card numbers only

## 📚 Next Steps

1. **Customize Characters** - Create unique AI personalities
2. **Test Chat** - Try different conversation styles
3. **Review Legal Pages** - Update with your company info
4. **Deploy** - Follow deployment guide in README.md

## 🆘 Need Help?

- Check the main README.md for detailed documentation
- Review API endpoints in the documentation
- Contact: support@roleplayai.com

---

**Ready to build amazing AI roleplay experiences! 🚀**
