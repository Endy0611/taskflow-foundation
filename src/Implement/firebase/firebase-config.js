// src/Implement/firebase/firebase-config.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";

// Build config from env
const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  // measurementId is optional for Auth
  // measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// --- Sanity check BEFORE initializeApp ---
const k = cfg.apiKey || "";
console.log("VITE_FIREBASE_API_KEY prefix:", k.slice(0, 6), "len:", k.length);
if (!/^AIza[0-9A-Za-z_\-]{35,}$/.test(k)) {
  console.error("Bad Firebase apiKey. Current cfg:", cfg);
  throw new Error("Invalid Firebase apiKey from env (.env.dev).");
}

// Init
const app = initializeApp(cfg);
export const auth = getAuth(app);

// Re-exports you use elsewhere
export { setPersistence, browserLocalPersistence, browserSessionPersistence };
