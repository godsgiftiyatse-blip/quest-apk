export function updateUI(level, xp){

    document.getElementById("level").innerText = `Level ${level}`;
    document.getElementById("xpText").innerText = `${xp} XP`;

    const progress = document.getElementById("progressBar");

    const percent = xp % 100;
    progress.style.width = `${percent}%`;
}
