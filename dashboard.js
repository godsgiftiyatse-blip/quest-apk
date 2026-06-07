import { auth } from "./firebase.js";
import { initTasks } from "./quests.js";
import { loadUser } from "./game.js";
import { updateUI, showLoading, hideLoading } from "./ui.js";

/* =========================
   DASHBOARD CONTROLLER
========================= */

auth.onAuthStateChanged(async (user) => {

    // 🔒 Not logged in → redirect
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // ⏳ Show loading screen
    const loader = showLoading("Loading your Quest...");

    try {

        // 📦 Load user data from Firestore
        const data = await loadUser();

        // 🎮 Update UI with real data
        updateUI(data.level, data.xp);

        // 🧩 Initialize quest system
        initTasks();

    } catch (error) {
        console.error("Dashboard load error:", error);

        // fallback UI (prevents blank screen)
        updateUI(1, 0);

    } finally {
        // ❌ Remove loading screen
        hideLoading(loader);
    }
});
