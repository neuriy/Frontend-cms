import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-wfqzVbPcT5Bf1JvJNGKA3j8K6BPyMhw",
  authDomain: "neuriyart-com.firebaseapp.com",
  projectId: "neuriyart-com",
  storageBucket: "neuriyart-com.firebasestorage.app",
  messagingSenderId: "762094443577",
  appId: "1:762094443577:web:b1c16194dfe8280a3c41e8",
  measurementId: "G-XY6K6HC5PG"
};

// Initialize Firebase only once to prevent Next.js hot-reload issues
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
