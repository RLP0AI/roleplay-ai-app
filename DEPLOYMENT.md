# 🚀 Deployment Guide

Complete guide to deploy your Roleplay AI application to production.

## Table of Contents
- [Backend Deployment (Railway/Render)](#backend-deployment)
- [Frontend Deployment (Vercel)](#frontend-deployment)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)

---

## Backend Deployment

### Option 1: Railway (Recommended)

1. **Create Railway Account**
   - Visit: https://railway.app/
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository

3. **Configure Service**
   - Select `backend` folder as root directory
   - Railway will auto-detect Node.js

4. **Add Environment Variables**
   ```
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://your-frontend-url.vercel.app
   
   FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
   FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
   
   GROQ_API_KEY=your_groq_api_key
   
   RAZORPAY_KEY_ID=your_live_key_id
   RAZORPAY_KEY_SECRET=your_live_key_secret
   ```

5. **Deploy**
   - Railway will automatically deploy
   - Copy the deployment URL

### Option 2: Render

1. **Create Render Account**
   - Visit: https://render.com/
   - Sign up with GitHub

2. **Create Web Service**
   - New → Web Service
   - Connect your repository
   - Root Directory: `backend`

3. **Configure Build**
   ```
   Build Command: npm install
   Start Command: node server.js
   ```

4. **Add Environment Variables** (same as Railway)

5. **Deploy**
   - Click "Create Web Service"
   - Copy the deployment URL

---

## Frontend Deployment

### Vercel (Recommended for Next.js)

1. **Create Vercel Account**
   - Visit: https://vercel.com/
   - Sign up with GitHub

2. **Import Project**
   - New Project → Import Git Repository
   - Select your repository
   - Root Directory: `frontend`

3. **Configure Build Settings**
   ```
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **Add Environment Variables**
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_live_razorpay_key_id
   ```

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically

---

## Environment Variables

### Production Backend (.env)

```env
# Server
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-app.vercel.app

# Firebase (Service Account as JSON string or file path)
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"..."}
# OR
FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com

# Groq API
GROQ_API_KEY=gsk_your_production_key

# Razorpay (LIVE KEYS - Be careful!)
RAZORPAY_KEY_ID=rzp_live_your_key_id
RAZORPAY_KEY_SECRET=your_live_secret_key
```

### Production Frontend

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Backend API
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api

# Razorpay (LIVE KEY - Be careful!)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_your_key_id
```

---

## Post-Deployment Checklist

### 1. Test Authentication
- [ ] Email/password signup
- [ ] Email/password login
- [ ] Google OAuth login
- [ ] Logout functionality

### 2. Test Character System
- [ ] Create new character
- [ ] Edit character
- [ ] Delete character
- [ ] View character list

### 3. Test Payment Flow
⚠️ **Use small amounts for testing**
- [ ] Create order
- [ ] Complete payment
- [ ] Verify credits added
- [ ] Check transaction history

### 4. Test Chat System
- [ ] Send message (credit deduction)
- [ ] Receive AI response
- [ ] Chat history persistence
- [ ] Low credit warning
- [ ] Zero credit blocking

### 5. Security Checks
- [ ] HTTPS enabled (automatic on Vercel/Railway)
- [ ] Environment variables secured
- [ ] API rate limiting active
- [ ] Firebase security rules configured
- [ ] Payment webhook verification working

---

## Firebase Security Rules

Update your Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Characters collection - users can only access their own characters
    match /characters/{characterId} {
      allow read, write: if request.auth != null && 
                           request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
    
    // Chats collection - users can only access their own chats
    match /chats/{chatId} {
      allow read, write: if request.auth != null && 
                           request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
    
    // Payments and transactions - read only for user's own data
    match /payments/{paymentId} {
      allow read: if request.auth != null && 
                    request.auth.uid == resource.data.userId;
    }
    
    match /transactions/{transactionId} {
      allow read: if request.auth != null && 
                    request.auth.uid == resource.data.userId;
    }
  }
}
```

---

## Razorpay Production Setup

### 1. Activate Live Mode

1. Complete KYC verification
2. Submit business documents
3. Wait for approval
4. Switch to Live Mode

### 2. Generate Live Keys

1. Dashboard → Settings → API Keys
2. Generate Live Keys
3. **KEEP THESE SECRET**
4. Update environment variables

### 3. Configure Webhooks (Optional)

For payment status updates:
```
Webhook URL: https://your-backend.railway.app/api/payment/webhook
Events: payment.captured, payment.failed
```

---

## Domain Setup (Optional)

### Add Custom Domain to Vercel

1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., roleplayai.com)
3. Update DNS records as instructed
4. SSL certificate is automatic

### Update Backend URL

Update `FRONTEND_URL` in backend environment variables to your custom domain.

---

## Monitoring & Maintenance

### Set Up Monitoring

1. **Error Tracking**
   - Sentry: https://sentry.io/
   - LogRocket: https://logrocket.com/

2. **Performance**
   - Vercel Analytics (built-in)
   - Google Analytics

3. **Uptime Monitoring**
   - UptimeRobot: https://uptimerobot.com/
   - Pingdom: https://pingdom.com/

### Regular Maintenance

- [ ] Monitor error logs weekly
- [ ] Check payment transactions daily
- [ ] Review Firebase costs monthly
- [ ] Update dependencies quarterly
- [ ] Backup database monthly

---

## Scaling Considerations

### When to Scale

- **Backend**: CPU/Memory usage consistently >80%
- **Database**: Read/Write operations >10k/day
- **AI API**: Rate limit warnings

### Scaling Options

1. **Vertical Scaling**
   - Upgrade Railway/Render plan
   - Increase server resources

2. **Horizontal Scaling**
   - Add load balancer
   - Deploy multiple backend instances
   - Use Redis for session management

3. **Database Optimization**
   - Add indexes to Firestore
   - Implement caching (Redis)
   - Archive old chat data

---

## Cost Estimates (Monthly)

### Minimal Traffic (~1000 users)
- Firebase: $0-25
- Groq API: $10-50 (depends on usage)
- Railway/Render: $5-20
- Vercel: $0 (free tier)
- Razorpay: Transaction fees only
- **Total: ~$15-95/month**

### Medium Traffic (~10k users)
- Firebase: $50-200
- Groq API: $100-500
- Railway/Render: $20-100
- Vercel: $0-20
- Razorpay: Transaction fees
- **Total: ~$170-820/month**

---

## Support & Troubleshooting

### Common Production Issues

**High Response Times**
- Solution: Enable caching, optimize database queries

**Payment Failures**
- Solution: Check Razorpay logs, verify webhook configuration

**Firebase Quota Exceeded**
- Solution: Upgrade plan or optimize queries

**AI Response Errors**
- Solution: Check Groq API status, implement retry logic

---

## Legal Compliance

Before going live:

- [ ] Update Terms & Conditions with company details
- [ ] Update Privacy Policy with actual practices
- [ ] Verify refund policy meets local laws
- [ ] Add contact information
- [ ] Set up business email
- [ ] Register domain
- [ ] Set up legal entity

---

## Rollback Plan

If something goes wrong:

1. **Vercel**: Rollback to previous deployment (Deployments → Previous → Promote)
2. **Railway**: Rollback via dashboard
3. **Database**: Restore from Firebase backup
4. **Environment**: Keep backup of working .env files

---

**Ready to launch! 🚀**

For questions: support@roleplayai.com
