import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config";

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const yahooProvider = new OAuthProvider("yahoo.com");
yahooProvider.addScope("email");
yahooProvider.addScope("profile");
yahooProvider.setCustomParameters({ prompt: "login" });

export { app, auth, db, googleProvider, yahooProvider };
