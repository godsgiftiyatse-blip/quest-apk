import { auth } from "./firebase.js";
import { onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import { loadUser } from "./game.js";
import { updateUI } from "./ui.js";

/* =========================
   APP BOOT SYSTEM
========================= */

let currentUserData = null;

/* Wait for Firebase Auth */
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    // Not logged in → redirect to login
    window.location.href = "login.html";
    return;
  }

  try {

    // Load user from Firestore
    currentUserData = await loadUser();

    if (!currentUserData) return;

    // Initialize UI safely
    updateUI(
      currentUserData.level,
      currentUserData.xp
    );

    console.log("🚀 App fully loaded for:", user.email);

  } catch (err) {
    console.error("App boot error:", err);
  }
});

/* =========================
   EXPORT SAFE ACCESS
========================= */
export function getCurrentUserData() {
  return currentUserData;
}
