# Quick Start Guide - Firebase Setup

## 🚀 Get Your App Running in 5 Minutes

### Step 1: Create Firebase Project (2 minutes)

1. Go to https://console.firebase.google.com/
2. Click **"Add project"**
3. Name it: `socialize-app` (or any name)
4. Disable Google Analytics (optional)
5. Click **"Create project"**

### Step 2: Add Web App (1 minute)

1. Click the **Web icon** (`</>`) in your Firebase dashboard
2. Name it: `Socialize Web`
3. Click **"Register app"**
4. **COPY the firebaseConfig object** - you'll need this!

### Step 3: Enable Firestore (1 minute)

1. In sidebar: **Build** → **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in test mode"**
4. Select your location (closest to you)
5. Click **"Enable"**

### Step 4: Configure Your App (1 minute)

Open `src/firebase/config.js` and replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",           // ← Paste your values here
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123"
};
```

### Step 5: Restart & Test

```bash
# Stop the dev server (Ctrl+C)
npm run dev
```

**That's it!** 🎉 Your app now has a real database!

---

## ✅ How to Verify It's Working

1. Add a post in your app
2. Refresh the page - post should still be there
3. Check Firebase Console → Firestore Database
4. You should see a `posts` collection with your data

## 🔥 What You Get with Firebase

- ✅ **Permanent storage** - Data never disappears
- ✅ **Cloud-based** - Access from any device
- ✅ **Real-time sync** - Updates instantly
- ✅ **Free tier** - No cost for small projects
- ✅ **Automatic backups** - Your data is safe

## 📚 Need More Help?

See the detailed guide: [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
