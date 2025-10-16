# Firebase Setup Guide

Follow these steps to set up Firebase for your Socialize app:

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `socialize-command-center` (or any name you prefer)
4. Click **Continue**
5. Disable Google Analytics (optional, you can enable it if you want)
6. Click **Create project**
7. Wait for the project to be created, then click **Continue**

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (`</>`) to add a web app
2. Enter app nickname: `Socialize Web App`
3. **Do NOT** check "Also set up Firebase Hosting" (unless you want to deploy)
4. Click **Register app**
5. You'll see your Firebase configuration object - **COPY THIS!**

It will look like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

## Step 3: Set Up Firestore Database

1. In the left sidebar, click **"Build"** → **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development)
   - This allows read/write access for 30 days
   - For production, you'll need to set up proper security rules
4. Choose a Cloud Firestore location (select closest to you)
5. Click **Enable**

## Step 4: Configure Your App

### Option A: Using Environment Variables (Recommended)

1. Create a `.env` file in your project root:
```bash
# Copy .env.example to .env
cp .env.example .env
```

2. Open `.env` and paste your Firebase config values:
```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

3. Update `src/firebase/config.js` to use environment variables:
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

### Option B: Direct Configuration (Quick Start)

1. Open `src/firebase/config.js`
2. Replace the placeholder values with your actual Firebase config:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-actual-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-actual-project.appspot.com",
  messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
  appId: "YOUR_ACTUAL_APP_ID"
};
```

## Step 5: Restart Your Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

## Step 6: Test Your App

1. Open your app in the browser
2. Try adding a new post
3. Refresh the page - your post should still be there!
4. Check Firebase Console → Firestore Database to see your data

## Security Rules (For Production)

When you're ready to deploy, update your Firestore security rules:

1. Go to Firebase Console → Firestore Database → Rules
2. Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to posts collection
    match /posts/{postId} {
      allow read, write: if true; // For now, allow all access
      // Later, you can add authentication:
      // allow read, write: if request.auth != null;
    }
  }
}
```

## Troubleshooting

### Error: "Failed to load posts"
- Check that you've replaced ALL placeholder values in `config.js`
- Verify your Firebase project is active
- Make sure Firestore is enabled in test mode

### Error: "Permission denied"
- Check Firestore security rules are in test mode
- Rules expire after 30 days - update them for production

### Posts not persisting
- Check browser console for errors
- Verify Firestore Database is created and enabled
- Check your internet connection

## Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Getting Started](https://firebase.google.com/docs/firestore/quickstart)
