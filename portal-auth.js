// ============================================================================
// portal-auth.js
// Real client login/signup for the VECTUZ portal, backed by Firebase Auth +
// Firestore. This replaces the old "any email/password gets you in" demo
// logic in portal.js. It exposes window.VectuzAuth so portal.js (a plain
// script, not a module) can call into it without you rewriting portal.js
// from scratch.
//
// This file must be loaded as: <script type="module" src="portal-auth.js">
// and it must load AFTER firebase-config.js (or import from it, as below —
// order doesn't matter with ES module imports, the browser resolves it).
// ============================================================================

import {
  auth, db,
  onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, updateProfile, GoogleAuthProvider, signInWithRedirect, getRedirectResult,
  doc, setDoc, getDoc, serverTimestamp
} from "./firebase-config.js";

function friendlyError(code) {
  var map = {
    "auth/email-already-in-use": "That email already has an account — try signing in instead.",
    "auth/invalid-email": "That email address doesn't look right.",
    "auth/weak-password": "Password needs to be at least 6 characters.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Wrong password — try again or reset it.",
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/too-many-requests": "Too many attempts — wait a bit and try again."
  };
  return map[code] || "Something went wrong. Try again.";
}

// ---- Sign up a brand-new client (you'll do this yourself, on their
// behalf, when a project starts — or send them the portal link to self-serve) ----
async function signUp(email, password, displayName, phone, plan) {
  var cred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(cred.user, { displayName: displayName });
  }
  // Create their client record in Firestore. doc id == their auth uid,
  // which is what the security rules in firebase-config.js check against.
  await setDoc(doc(db, "clients", cred.user.uid), {
    name: displayName || "",
    email: email,
    phone: phone || "",
    plan: plan || "Starter",
    projectStatus: "In progress",
    approved: false, // flip to true in the Firestore console once you've vetted the client
    authProvider: "password",
    createdAt: serverTimestamp()
  });
  return cred.user;
}

// ---- Sign up / sign in with Google (one button handles both) ----
// Kicks off Google sign-in. This NAVIGATES AWAY from your page to Google's
// sign-in screen and back — it does not return a user directly (mobile
// browsers block the popup-based version, which is why this uses redirect
// instead). Whatever happens after the redirect is handled by
// handleGoogleRedirect() below, called once on page load.
function googleSignIn() {
  var provider = new GoogleAuthProvider();
  return signInWithRedirect(auth, provider);
}

// Call this once, automatically, every time the portal page loads. Most of
// the time it resolves to null (nobody just came back from a Google
// redirect). If someone DID just complete Google sign-in, it creates their
// Firestore profile (first time only) and resolves to their user object.
async function handleGoogleRedirect() {
  var result = await getRedirectResult(auth);
  if (!result || !result.user) return null;
  var cred = result;
  var existing = await getDoc(doc(db, "clients", cred.user.uid));
  if (!existing.exists()) {
    await setDoc(doc(db, "clients", cred.user.uid), {
      name: cred.user.displayName || "",
      email: cred.user.email || "",
      phone: "",
      plan: "Starter",
      projectStatus: "In progress",
      approved: false,
      authProvider: "google",
      createdAt: serverTimestamp()
    });
  }
  return cred.user;
}

// ---- Sign in an existing client ----
async function logIn(email, password) {
  var cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

// ---- Sign out ----
async function logOut() {
  await signOut(auth);
}

// ---- Fetch the client's Firestore profile (plan, status, etc.) ----
async function getClientProfile(uid) {
  var snap = await getDoc(doc(db, "clients", uid));
  return snap.exists() ? snap.data() : null;
}

// Expose a small bridge object for portal.js (classic script) to use.
window.VectuzAuth = {
  signUp: signUp,
  logIn: logIn,
  logOut: logOut,
  googleSignIn: googleSignIn,
  handleGoogleRedirect: handleGoogleRedirect,
  getClientProfile: getClientProfile,
  friendlyError: friendlyError,
  // Fires on load and whenever auth state changes — lets portal.js decide
  // whether to show the login screen or the dashboard, e.g. on page refresh.
  onReady: function (callback) {
    onAuthStateChanged(auth, function (user) {
      callback(user);
    });
  }
};
