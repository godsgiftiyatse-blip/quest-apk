/* =========================
   QUEST UI ENGINE (PRODUCTION)
   PURE UI ONLY - NO DATA LOGIC
========================= */

/* =========================
   XP POPUP ANIMATION
========================= */
export function showXP(amount) {

    const popup = document.createElement("div");
    popup.className = "xp-popup";
    popup.innerText = `+${amount} XP`;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 1200);
}

/* =========================
   LEVEL UP MODAL
========================= */
export function showLevelUp(level) {

    const modal = document.createElement("div");
    modal.className = "level-modal";

    modal.innerHTML = `
        <div class="level-box">
            <h2>🎉 Level Up!</h2>
            <p>You reached Level ${level}</p>
        </div>
    `;

    document.body.appendChild(modal);

    setTimeout(() => {
        modal.remove();
    }, 2000);
}

/* =========================
   MAIN UI UPDATE (FROM FIRESTORE DATA)
========================= */
export function updateUI(level, xp) {

    const levelText = document.getElementById("level");
    const xpText = document.getElementById("xpText");
    const progressBar = document.getElementById("progressBar");

    if (levelText) {
        levelText.innerText = `Level ${level}`;
    }

    if (xpText) {
        xpText.innerText = `${xp} XP`;
    }

    if (progressBar) {
        const percent = xp % 100;
        progressBar.style.width = `${percent}%`;
    }
}

/* =========================
   TASK COMPLETION UI HANDLER
   (NO XP LOGIC INSIDE)
========================= */
export function completeTaskUI(taskElement) {

    if (!taskElement) return;

    if (taskElement.classList.contains("done")) return;

    taskElement.classList.add("done");

    /* optional visual feedback */
    taskElement.style.opacity = "0.6";
    taskElement.style.transform = "scale(0.98)";
}

/* =========================
   LOADING SCREEN (OPTIONAL)
========================= */
export function showLoading(text = "Loading...") {

    const loader = document.createElement("div");
    loader.className = "loading-screen";

    loader.innerHTML = `
        <div class="loading-box">
            <div class="spinner"></div>
            <p>${text}</p>
        </div>
    `;

    document.body.appendChild(loader);

    return loader;
}

/* =========================
   REMOVE LOADING SCREEN
========================= */
export function hideLoading(loader) {

    if (loader) {
        loader.remove();
    }
}
