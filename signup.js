import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* UI ELEMENTS */
const form = document.getElementById("signupForm");
const errorBox = document.getElementById("error");
const btn = document.getElementById("signupBtn");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // reset UI
    errorBox.innerText = "";
    btn.innerText = "Creating account...";
    btn.disabled = true;

    try {
        // 🔐 create auth user
        const userCred = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCred.user;

        // 📦 create Firestore profile
        await setDoc(doc(db, "users", user.uid), {
            xp: 0,
            level: 1,
            streak: 0,
            lastLogin: new Date().toISOString(),
            completedTasks: []
        });

        // success → redirect
        window.location.href = "dashboard.html";

    } catch (error) {
        errorBox.innerText = error.message;

    } finally {
        btn.innerText = "Sign Up";
        btn.disabled = false;
    }
});
