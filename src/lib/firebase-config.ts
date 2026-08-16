/**
 * Shared Firebase config — must match the IDHook auth web app
 * (https://github.com/neuriy/IDHook) so both apps share the same nID users.
 *
 * Firebase web API keys are public by design (restrict by HTTP referrer /
 * domain in the Firebase console). Override via NEXT_PUBLIC_FIREBASE_* env.
 */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyB-wfqzVbPcT5Bf1JvJNGKA3j8K6BPyMhw",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "robbieart-com.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "robbieart-com",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "robbieart-com.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "762094443577",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:762094443577:web:bb725c4d3c8b5c943c41e8",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "G-K9YYD5CMS7",
};

/** Hosted Neuriy nID login (IDHook). Empty = use in-app /auth/login via SDK. */
export const idhookBaseUrl =
  process.env.NEXT_PUBLIC_IDHOOK_URL?.replace(/\/$/, "") ?? "https://id.neuriy.com";
