import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Fetching Firebase configuration from environment variables
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Logging each individual config value
console.log("Firebase API Key:", process.env.REACT_APP_FIREBASE_API_KEY);
console.log("Firebase Auth Domain:", process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);
console.log("Firebase Project ID:", process.env.REACT_APP_FIREBASE_PROJECT_ID);
console.log("Firebase Storage Bucket:", process.env.REACT_APP_FIREBASE_STORAGE_BUCKET);
console.log("Firebase Messaging Sender ID:", process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID);
console.log("Firebase App ID:", process.env.REACT_APP_FIREBASE_APP_ID);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, db };
