import { db, auth } from "./firebase.js";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { showXP, showLevelUp, updateUI } from "./ui.js";

/* =========================
   LOAD USER (SAFE + STABLE)
========================= */
export async function loadUser() {
  const user = auth.currentUser;

  if (!user) return null;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    const newUser = {
      username: user.email.split("@")[0],
      xp: 0,
      level: 1,
      streak: 0,
      completedTasks: []
    };

    await setDoc(ref, newUser);
    await setDoc(doc(db, "leaderboard", user.uid), newUser);

    return newUser;
  }

  return snap.data();
}

/* =========================
   ADD XP (SAFE + SYNCED)
========================= */
export async function addXP(amount) {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const boardRef = doc(db, "leaderboard", user.uid);

  const snap = await getDoc(userRef);
  if (!snap.exists()) return;

  const data = snap.data();

  const currentXP = data.xp || 0;
  const currentLevel = data.level || 1;

  const newXP = currentXP + amount;
  const newLevel = Math.floor(newXP / 100) + 1;

  await updateDoc(userRef, {
    xp: newXP,
    level: newLevel
  });

  await updateDoc(boardRef, {
    xp: newXP,
    level: newLevel
  });

  showXP(amount);
  updateUI(newLevel, newXP);

  if (newLevel > currentLevel) {
    showLevelUp(newLevel);
  }
}

/* =========================
   COMPLETE TASK (ANTI DUPLICATE)
========================= */
export async function completeTask(taskId, reward) {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid);

  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const data = snap.data();

  const completed = data.completedTasks || [];

  if (completed.includes(taskId)) return;

  await updateDoc(ref, {
    completedTasks: arrayUnion(taskId)
  });

  await addXP(reward);
}
