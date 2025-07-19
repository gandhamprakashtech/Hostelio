// js/user_login.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists() && userDoc.data().role === "user") {
        alert("Login successful!");
        window.location.href = "user_dashboard.html";
      } else {
        alert("Invalid role or unauthorized access.");
      }
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  });
});
