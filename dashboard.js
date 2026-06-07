import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

// 🔥 Your Firebase config (replace with yours)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 📊 Load user data
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const data = snap.data();

      document.getElementById("name").textContent = data.name;
      document.getElementById("xp").textContent = data.xp;
      document.getElementById("level").textContent = data.level;
    }
  } else {
    window.location.href = "login.html";
  }
});

// 🎮 XP SYSTEM
window.gainXP = async function () {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    let data = snap.data();

    let xp = data.xp + 10;
    let level = data.level;

    if (xp >= 100) {
      level += 1;
      xp = 0;
    }

    await updateDoc(ref, { xp, level });

    document.getElementById("xp").textContent = xp;
    document.getElementById("level").textContent = level;
  }
};

// 🚪 Logout
window.logout = async function () {
  await signOut(auth);
  window.location.href = "login.html";
};
