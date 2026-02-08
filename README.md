# Roleplay AI - Full-Stack Application

A production-ready roleplay AI web application where users buy credits to chat with custom AI characters.

## 🚀 Features

- **User Authentication**: Sign up/login with email or Google
- **Credit System**: Buy credits using Razorpay (₹1 = 15 credits)
- **Character Creation**: Create custom AI characters with unique personalities
- **AI Chat**: Chat with characters using Groq API (1 credit per message)
- **Real-time Updates**: Firebase Firestore for real-time data
- **Secure Payments**: Razorpay payment gateway integration
- **Responsive Design**: Modern UI with Tailwind CSS

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Tailwind CSS** - Styling
- **Firebase Auth** - Authentication
- **Firebase Firestore** - Real-time database
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **Firebase Admin** - Server-side Firebase
- **Groq SDK** - AI integration
- **Razorpay** - Payment processing

## 📁 Project Structure

```
roleplay-ai-app/
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # React components
│   │   └── lib/             # Utils, Firebase, API client
│   ├── public/
│   ├── package.json
│   └── next.config.js
├── backend/                  # Express backend
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Auth & error handling
│   │   ├── config/          # Firebase, Groq, Razorpay config
│   │   └── services/        # Business logic
│   ├── package.json
│   └── server.js
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Firebase account
- Groq API key
- Razorpay account (for payments)

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** (Email/Password and Google)
4. Enable **Firestore Database**
5. Create a web app and copy the configuration
6. Download service account key for backend

### 2. Groq API Setup

1. Go to [Groq Console](https://console.groq.com/)
2. Create an account
3. Generate an API key
4. Copy the API key

### 3. Razorpay Setup

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Create an account
3. Go to Settings → API Keys
4. Generate Test/Live keys
5. Copy Key ID and Key Secret

### 4. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
nano .env
```

**.env Configuration:**
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Firebase Admin
FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com

# Groq API
GROQ_API_KEY=your_groq_api_key_here

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Place your Firebase service account JSON file as `serviceAccountKey.json` in the backend directory.

### 5. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local

# Edit .env.local with your credentials
nano .env.local
```

**.env.local Configuration:**
```env
# Firebase (from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 6. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Access the application at: http://localhost:3000

## 📊 Database Schema

### Users Collection
```javascript
{
  email: string,
  displayName: string,
  credits: number,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Characters Collection
```javascript
{
  userId: string,
  name: string,
  role: string,
  personality: string,
  style: string,
  backstory: string,
  nsfw: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Chats Collection
```javascript
{
  userId: string,
  characterId: string,
  characterName: string,
  messages: [
    {
      role: 'user' | 'assistant',
      content: string,
      timestamp: timestamp
    }
  ],
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Payments Collection
```javascript
{
  userId: string,
  orderId: string,
  paymentId: string,
  amount: number,
  credits: number,
  status: 'pending' | 'completed',
  createdAt: timestamp,
  completedAt: timestamp
}
```

### Transactions Collection
```javascript
{
  userId: string,
  type: 'credit' | 'debit',
  amount: number,
  reason: string,
  timestamp: timestamp
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify` - Verify token

### Characters
- `POST /api/characters` - Create character
- `GET /api/characters` - Get all user characters
- `GET /api/characters/:id` - Get single character
- `PUT /api/characters/:id` - Update character
- `DELETE /api/characters/:id` - Delete character

### Chat
- `POST /api/chat/create` - Create chat session
- `POST /api/chat/message` - Send message and get AI response
- `GET /api/chat/:characterId` - Get chat history
- `DELETE /api/chat/:chatId` - Delete chat

### Credits
- `GET /api/credits` - Get user credits
- `GET /api/credits/transactions` - Get transaction history

### Payment
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment and add credits
- `GET /api/payment/history` - Get payment history

## 💳 Payment Flow

1. User enters amount on buy-credits page
2. Frontend calculates credits (₹1 = 15 credits)
3. Backend creates Razorpay order
4. Razorpay checkout opens
5. User completes payment
6. Razorpay sends success response
7. Frontend sends verification request to backend
8. Backend verifies signature
9. Credits added to user account
10. Transaction logged in database

## 🔒 Security Features

- Firebase Authentication
- JWT token verification
- Rate limiting
- Input validation
- Payment signature verification
- HTTPS recommended for production
- Environment variable protection
- SQL injection prevention (Firestore NoSQL)

## 🚀 Deployment

### Backend Deployment (Heroku Example)

```bash
cd backend
heroku create your-app-name-api
heroku config:set NODE_ENV=production
heroku config:set GROQ_API_KEY=your_key
heroku config:set RAZORPAY_KEY_ID=your_key
heroku config:set RAZORPAY_KEY_SECRET=your_secret
# Add other environment variables
git push heroku main
```

### Frontend Deployment (Vercel Example)

```bash
cd frontend
vercel
# Follow prompts and add environment variables in Vercel dashboard
```

## 📝 Legal Pages

The application includes:
- **Terms & Conditions** - User agreement and service terms
- **Privacy Policy** - Data collection and usage
- **Refund Policy** - Non-refundable credit policy

## ⚠️ Important Notes

- Credits are **non-refundable**
- Credits have **no cash value**
- Service is for **entertainment purposes only**
- **18+ only** - Age verification required
- Test with Razorpay test mode before going live

## 🐛 Troubleshooting

### Common Issues

**Firebase Connection Error:**
- Check Firebase configuration in `.env` files
- Ensure Firebase project has required services enabled

**AI Response Error:**
- Verify Groq API key is valid
- Check API rate limits

**Payment Issues:**
- Use Razorpay test keys for testing
- Verify webhook configuration

**Credit Not Deducted:**
- Check backend logs
- Verify database write permissions

## 📞 Support

For issues or questions:
- Email: support@roleplayai.com

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

---

**Built with ❤️ for immersive AI roleplay experiences**
