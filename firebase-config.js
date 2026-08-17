// ============================================================================
// firebase-config.js
// Firebase (Firestore + Auth) setup — loaded as an ES module straight from
// Google's CDN. No npm, no build step, works from GitHub's web editor.
//
// SETUP (do this once, from your phone, no laptop needed):
// 1. Go to https://console.firebase.google.com → Add project → name it
//    "vectuz-portal" (or anything) → skip Google Analytics if you want,
//    doesn't matter.
// 2. Inside the project: Build → Authentication → Get started →
//    enable "Email/Password" sign-in method.
// 3. Build → Firestore Database → Create database → Start in
//    "production mode" → pick a region close to Kenya (e.g. europe-west1).
// 4. Project settings (gear icon) → General → scroll to "Your apps" →
//    click the </> (web) icon → register app "VECTUZ Portal" →
//    it will show you a firebaseConfig object. Copy those values into
//    the object below, replacing the placeholder strings.
// 5. Firestore → Rules tab → paste the rules block at the bottom of this
//    file's comments (below) so clients can only read/write their own data.
// ============================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// -------- PASTE YOUR REAL CONFIG HERE (from Firebase console) --------
const firebaseConfig = {
  apiKey: "AIzaSyBA09W9D5SmryHB30N3ptFt7xPLwhJ0Zyc",
  authDomain: "vectuz-9ef0c.firebaseapp.com",
  projectId: "vectuz-9ef0c",
  storageBucket: "vectuz-9ef0c.firebasestorage.app",
  messagingSenderId: "406482709380",
  appId: "1:406482709380:web:b4588b410e202762aa4bd1"
};
// -----------------------------------------------------------------------

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Re-exported so portal-auth.js and payments.js can just import from here
// instead of hitting the CDN again.
export {
  app, auth, db,
  onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, updateProfile,GoogleAuthProvider, signInWithPopup,
  doc, setDoc, getDoc, updateDoc, collection, addDoc, serverTimestamp
};

/*
FIRESTORE SECURITY RULES — paste this into Firestore → Rules → Publish.
Without this, ANY logged-in user (or a stranger with your API key visible
in page source, which is normal/expected for Firebase) could read or edit
other clients' data. This locks each client to their own document.

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /clients/{userId} {
      allow read, update: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;
    }
    match /clients/{userId}/payments/{paymentId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if false; // payments are only ever written by your
                              // Supabase Edge Function using a service key,
                              // never directly by the client's browser.
    }
  }
}
*/
