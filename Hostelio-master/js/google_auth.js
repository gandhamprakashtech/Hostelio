// js/google_auth.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAJGgVaOHfh3n2XY1IDFrZ1o3wjYMhP75M",
  authDomain: "hostelio-aa3a5.firebaseapp.com",
  projectId: "hostelio-aa3a5",
  storageBucket: "hostelio-aa3a5.appspot.com",
  messagingSenderId: "982239556216",
  appId: "1:982239556216:web:0ad47094dc0ca63cc2f38d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Always show account picker
provider.setCustomParameters({
  prompt: "select_account",
});

// 👇 Call this function on button click
export async function continueWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    // If new user, create Firestore record
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        fullName: user.displayName || "",
        email: user.email,
        role: "user",
        createdAt: new Date(),
      });
    }

    alert("Google sign-in successful!");
    window.location.href = "user_dashboard.html";
  } catch (error) {
    console.error("Google sign-in error:", error.message);
    alert("Google login failed: " + error.message);
  }
}
