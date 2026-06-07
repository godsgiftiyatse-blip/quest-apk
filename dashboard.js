import { auth } from "./firebase.js";
import { initTasks } from "./quests.js";
import { loadUser, addXP } from "./game.js";

/* CHECK LOGIN */
auth.onAuthStateChanged(async (user) => {

    if(!user){
        window.location.href = "login.html";
        return;
    }

    await loadUser();

    initTasks();
});
