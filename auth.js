import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.signup = async () => {

  const username =
    document.getElementById("username").value;

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  try {

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    const user =
      userCredential.user;

    await setDoc(
      doc(db, "users", user.uid),
      {
        username,
        email,
        xp: 0,
        level: 1,
        streak: 0,
        createdAt: Date.now()
      }
    );

    window.location.href = "home.html";

  } catch(error) {

    alert(error.message);

  }
};

window.login = async () => {

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    window.location.href =
      "home.html";

  } catch(error) {

    alert(error.message);

  }

};
