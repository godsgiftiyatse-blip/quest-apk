import { db, auth } from "./firebase.js";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  arrayUnion
} from "firebase/firestore";

import { showXP, showLevelUp, updateUI } from "./ui.js";

/* LOAD USER DATA */
export async function loadUser(){
    const user = auth.currentUser;
    const ref = doc(db, "users", user.uid);

    const snap = await getDoc(ref);
    return snap.data();
}

/* ADD XP */
export async function addXP(amount){

    const user = auth.currentUser;
    const ref = doc(db, "users", user.uid);

    await updateDoc(ref, {
        xp: increment(amount)
    });

    const snap = await getDoc(ref);
    const data = snap.data();

    const level = Math.floor(data.xp / 100) + 1;

    if(level !== data.level){
        await updateDoc(ref, { level });
        showLevelUp(level);
    }

    showXP(amount);
    updateUI(level, data.xp);
}

/* COMPLETE TASK */
export async function completeTask(taskId, reward){

    const user = auth.currentUser;
    const ref = doc(db, "users", user.uid);

    const snap = await getDoc(ref);
    const data = snap.data();

    if(data.completedTasks.includes(taskId)) return;

    await updateDoc(ref, {
        completedTasks: arrayUnion(taskId)
    });

    await addXP(reward);
}
