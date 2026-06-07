/* =========================
   QUEST V3 GAME ENGINE
========================= */

let xp = parseInt(localStorage.getItem("xp")) || 0;
let level = parseInt(localStorage.getItem("level")) || 1;

function addXP(amount){

    xp += amount;

    let newLevel = Math.floor(xp / 100) + 1;

    if(newLevel > level){
        level = newLevel;
        showLevelUp(level);
    }

    localStorage.setItem("xp", xp);
    localStorage.setItem("level", level);

    showXP(amount);
    updateUI();
}

/* XP POPUP */
function showXP(amount){

    let popup = document.createElement("div");
    popup.className = "xp-popup";
    popup.innerText = "+ " + amount + " XP";

    document.body.appendChild(popup);

    setTimeout(()=> popup.remove(), 1200);
}

/* LEVEL UP MODAL */
function showLevelUp(level){

    let modal = document.createElement("div");
    modal.className = "level-modal";

    modal.innerHTML = `
        <div class="level-box">
            <h2>🎉 Level Up!</h2>
            <p>You reached Level ${level}</p>
        </div>
    `;

    document.body.appendChild(modal);

    setTimeout(()=> modal.remove(), 2000);
}

/* TASK COMPLETE */
function completeTask(el){

    if(el.classList.contains("done")) return;

    el.classList.add("done");

    addXP(20);
}

/* =========================
   SIMPLE UI UPDATE HOOK
========================= */
function updateUI(){
    let levelText = document.getElementById("level");
    let xpText = document.getElementById("xpText");
    let progress = document.getElementById("progressBar");

    if(levelText){
        levelText.innerText = "Level " + level;
        xpText.innerText = xp + " XP";
        progress.style.width = (xp % 100) + "%";
    }
}
