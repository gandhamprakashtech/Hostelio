// admin_signup.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJGgVaOHfh3n2XY1IDFrZ1o3wjYMhP75M",
  authDomain: "hostelio-aa3a5.firebaseapp.com",
  projectId: "hostelio-aa3a5",
  storageBucket: "hostelio-aa3a5.appspot.com",
  messagingSenderId: "982239556216",
  appId: "1:982239556216:web:0ad47094dc0ca63cc2f38d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Wait for DOM to load
window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const username = document.getElementById("username").value;
    const hostelName = document.getElementById("hostelName").value;
    const hostelLocation = document.getElementById("hostelLocation").value;
    const experience = document.getElementById("experience").value;
    const dob = document.getElementById("dob").value;
    const adminId = document.getElementById("adminId").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "admins", user.uid), {
        fullName,
        email,
        phone,
        username,
        hostelName,
        hostelLocation,
        experience,
        dob,
        adminId,
        role: "admin",
        createdAt: new Date().toISOString(),
      });

      alert("Admin account created successfully!");
      form.reset();
    } catch (error) {
      console.error("Error during admin signup:", error);
      alert("Signup failed: " + error.message);
    }
  });
});
