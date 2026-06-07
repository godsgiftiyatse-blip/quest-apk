import { db, auth } from "./firebase.js";
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    increment,
    arrayUnion
} from "firebase/firestore";

import { showXP, showLevelUp, updateUI } from "./ui.js";

/* GET USER SAFE */
export async function loadUser(){

    const user = auth.currentUser;
    const ref = doc(db, "users", user.uid);

    const snap = await getDoc(ref);

    if (!snap.exists()) {
        const newUser = {
            xp: 0,
            level: 1,
            streak: 0,
            lastLogin: new Date().toISOString(),
            completedTasks: []
        };

        await setDoc(ref, newUser);
        return newUser;
    }

    return snap.data();
}

/* ADD XP (SAFE + CONTROLLED) */
export async function addXP(amount){

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

/* COMPLETE TASK (ANTI-DUPLICATE) */
export async function completeTask(taskId, reward){

    const user = auth.currentUser;
    const ref = doc(db, "users", user.uid);

    const snap = await getDoc(ref);
    const data = snap.data();

    const completed = data.completedTasks || [];

    if (completed.includes(taskId)) return;

    await updateDoc(ref, {
        completedTasks: arrayUnion(taskId)
    });

    await addXP(reward);
}
