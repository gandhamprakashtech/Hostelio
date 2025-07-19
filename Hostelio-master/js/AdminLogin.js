// js/admin_login.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
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

// Login handler
window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const adminId = document.getElementById("adminId").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        adminId,
        password
      );
      const user = userCredential.user;

      const docRef = doc(db, "admins", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        alert("Login successful! Redirecting to admin dashboard...");
        window.location.href = "AdminDashboard.html";
      } else {
        await signOut(auth);
        alert("Access denied: This account is not registered as an admin.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Login failed: " + error.message);
    }
  });
});
