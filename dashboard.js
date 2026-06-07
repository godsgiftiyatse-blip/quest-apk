import { auth } from "./firebase.js";
import { initTasks } from "./quests.js";
import { loadUser } from "./game.js";
import { updateUI } from "./ui.js";

auth.onAuthStateChanged(async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const data = await loadUser();

    updateUI(data.level, data.xp); // 🔥 FIX: load real data into UI

    initTasks();
});
