/* =========================
   QUEST UI ENGINE (CLEAN)
   No localStorage, no Firestore
   PURE UI ONLY
========================= */

/* XP POPUP */
export function showXP(amount){

    let popup = document.createElement("div");
    popup.className = "xp-popup";
    popup.innerText = `+ ${amount} XP`;

    document.body.appendChild(popup);

    setTimeout(() => popup.remove(), 1200);
}

/* LEVEL UP MODAL */
export function showLevelUp(level){

    let modal = document.createElement("div");
    modal.className = "level-modal";

    modal.innerHTML = `
        <div class="level-box">
            <h2>🎉 Level Up!</h2>
            <p>You reached Level ${level}</p>
        </div>
    `;

    document.body.appendChild(modal);

    setTimeout(() => modal.remove(), 2000);
}

/* TASK COMPLETE UI HANDLER */
export function completeTask(el, onComplete){

    if(el.classList.contains("done")) return;

    el.classList.add("done");

    // Let dashboard.js handle XP logic
    if(typeof onComplete === "function"){
        onComplete();
    }
}

/* =========================
   UI UPDATE (READ ONLY)
   You pass values from Firestore
========================= */
export function updateUI(level, xp){

    let levelText = document.getElementById("level");
    let xpText = document.getElementById("xpText");
    let progress = document.getElementById("progressBar");

    if(levelText){
        levelText.innerText = "Level " + level;
    }

    if(xpText){
        xpText.innerText = xp + " XP";
    }

    if(progress){
        progress.style.width = (xp % 100) + "%";
    }
}
