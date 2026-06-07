import { db, auth } from "./firebase.js";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { showXP, showLevelUp, updateUI } from "./ui.js";

export async function loadUser() {
  const user = auth.currentUser;
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    const newUser = {
      xp: 0,
      level: 1,
      streak: 0,
      completedTasks: []
    };

    await setDoc(ref, newUser);
    return newUser;
  }

  return snap.data();
}

export async function addXP(amount) {
  const user = auth.currentUser;
  const ref = doc(db, "users", user.uid);

  const snap = await getDoc(ref);
  const data = snap.data();

  const newXP = (data.xp || 0) + amount;
  const newLevel = Math.floor(newXP / 100) + 1;

  await updateDoc(ref, {
    xp: newXP,
    level: newLevel
  });

  showXP(amount);
  updateUI(newLevel, newXP);

  if (newLevel > data.level) {
    showLevelUp(newLevel);
  }
}

export async function completeTask(taskId, reward) {
  const user = auth.currentUser;
  const ref = doc(db, "users", user.uid);

  const snap = await getDoc(ref);
  const data = snap.data();

  if ((data.completedTasks || []).includes(taskId)) return;

  await updateDoc(ref, {
    completedTasks: arrayUnion(taskId)
  });

  await addXP(reward);
}
