import { db } from "./firebase.js";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =========================
   REAL-TIME LEADERBOARD
========================= */
export function initLeaderboard() {

  const q = query(
    collection(db, "leaderboard"),
    orderBy("xp", "desc"),
    limit(10)
  );

  onSnapshot(q, (snapshot) => {

    const list = document.getElementById("leaderboard");

    if (!list) return;

    list.innerHTML = "";

    snapshot.forEach(doc => {

      const user = doc.data();

      const item = document.createElement("div");
      item.className = "lb-item";

      item.innerHTML = `
        <span>${user.username}</span>
        <span>Lv ${user.level}</span>
        <span>${user.xp} XP</span>
      `;

      list.appendChild(item);
    });
  });
}
