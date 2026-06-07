import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

let userRef;

// 🔐 CHECK USER LOGIN
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  userRef = doc(db, "users", user.uid);

  const snap = await getDoc(userRef);

  if (snap.exists()) {
    const data = snap.data();

    document.getElementById("level").textContent = "Level " + data.level;
    document.getElementById("xpText").textContent = data.xp + " XP";

    updateProgress(data.xp);
  }
});

// 🎮 COMPLETE TASK = ADD XP
window.completeTask = async function (el) {
  if (el.classList.contains("done")) return;

  el.classList.add("done");

  const snap = await getDoc(userRef);
  let data = snap.data();

  let xp = data.xp + 20;
  let level = data.level;

  // LEVEL UP SYSTEM
  if (xp >= 100) {
    level += 1;
    xp = 0;
  }

  await updateDoc(userRef, {
    xp,
    level
  });

  document.getElementById("level").textContent = "Level " + level;
  document.getElementById("xpText").textContent = xp + " XP";

  updateProgress(xp);
};

// 📊 PROGRESS BAR
function updateProgress(xp) {
  let percent = xp;
  document.getElementById("progressBar").style.width = percent + "%";
}

// 🚪 LOGOUT
window.logout = async function () {
  await signOut(auth);
  window.location.href = "login.html";
};
