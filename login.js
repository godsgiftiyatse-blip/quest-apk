import { auth } from "./firebase.js";
import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* UI ELEMENTS */
const form = document.getElementById("loginForm");
const errorBox = document.getElementById("error");
const btn = document.getElementById("loginBtn");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // reset UI
    errorBox.innerText = "";
    btn.innerText = "Logging in...";
    btn.disabled = true;

    try {
        await signInWithEmailAndPassword(auth, email, password);

        // success → redirect
        window.location.href = "dashboard.html";

    } catch (error) {
        errorBox.innerText = error.message;

    } finally {
        btn.innerText = "Login";
        btn.disabled = false;
    }
});
