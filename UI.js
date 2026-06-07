export function showXP(amount){

    const popup = document.createElement("div");
    popup.className = "xp-popup";
    popup.innerText = `+${amount} XP`;

    document.body.appendChild(popup);

    setTimeout(() => popup.remove(), 1200);
}

export function showLevelUp(level){

    const modal = document.createElement("div");
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

export function updateUI(level, xp){

    document.getElementById("level").innerText = `Level ${level}`;
    document.getElementById("xpText").innerText = `${xp} XP`;
    document.getElementById("progressBar").style.width = `${xp % 100}%`;
}
