import { auth } from "./firebase.js";
import { loadUser } from "./game.js";
import { initTasks } from "./quests.js";
import { updateUI } from "./ui.js";
import { initLeaderboard } from "./leaderboard.js";

auth.onAuthStateChanged(async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const data = await loadUser();

  updateUI(data.level, data.xp);

  initTasks();

  initLeaderboard();
});
