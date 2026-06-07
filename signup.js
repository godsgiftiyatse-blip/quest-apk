import { auth, db, provider } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById("signupForm");
const errorBox = document.getElementById("error");
const btn = document.getElementById("signupBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = email.value;
  const password = password.value;

  btn.innerText = "Creating...";
  btn.disabled = true;

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCred.user.uid), {
      xp: 0,
      level: 1,
      streak: 0,
      completedTasks: [],
      createdAt: new Date().toISOString()
    });

    window.location.href = "dashboard.html";
  } catch (err) {
    errorBox.innerText = err.message;
  } finally {
    btn.innerText = "Sign Up";
    btn.disabled = false;
  }
});

window.googleSignup = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;

    await setDoc(doc(db, "users", user.uid), {
      xp: 0,
      level: 1,
      streak: 0,
      completedTasks: [],
      createdAt: new Date().toISOString()
    });

    window.location.href = "dashboard.html";
  } catch (err) {
    errorBox.innerText = err.message;
  }
};
