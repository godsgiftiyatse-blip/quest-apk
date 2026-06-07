import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);

        // create user profile in Firestore
        await setDoc(doc(db, "users", userCred.user.uid), {
            xp: 0,
            level: 1,
            streak: 0,
            lastLogin: new Date().toISOString(),
            completedTasks: []
        });

        window.location.href = "dashboard.html";

    } catch (error) {
        alert("Signup failed: " + error.message);
    }
});
