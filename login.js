import { auth, provider } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const form = document.getElementById("loginForm");
const errorBox = document.getElementById("error");
const btn = document.getElementById("loginBtn");

onAuthStateChanged(auth, (user) => {
  if (user) window.location.href = "dashboard.html";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = email.value;
  const password = password.value;

  errorBox.innerText = "";
  btn.innerText = "Loading...";
  btn.disabled = true;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (err) {
    errorBox.innerText = err.message;
  } finally {
    btn.innerText = "Login";
    btn.disabled = false;
  }
});

window.googleLogin = async () => {
  try {
    await signInWithPopup(auth, provider);
    window.location.href = "dashboard.html";
  } catch (err) {
    errorBox.innerText = err.message;
  }
};

window.resetPassword = async () => {
  const email = document.getElementById("email").value;

  try {
    await sendPasswordResetEmail(auth, email);
    errorBox.innerText = "Reset email sent!";
  } catch (err) {
    errorBox.innerText = err.message;
  }
};
