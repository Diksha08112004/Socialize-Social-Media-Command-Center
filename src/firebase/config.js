import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBExFAWCtkLJaJLhBpDwf1uNj4LOuhrKFw",
  authDomain: "social-media-command-cen-af2be.firebaseapp.com",
  projectId: "social-media-command-cen-af2be",
  storageBucket: "social-media-command-cen-af2be.firebasestorage.app",
  messagingSenderId: "835495479153",
  appId: "1:835495479153:web:0d23c4e361d31e37f4980b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
