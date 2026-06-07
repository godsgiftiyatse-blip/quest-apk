// 🔐 Login protection
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

let xp = localStorage.getItem("xp");
let streak = localStorage.getItem("streak");
let lastLogin = localStorage.getItem("lastLogin");

if (xp === null) xp = 0;
else xp = parseInt(xp);

if (streak === null) streak = 0;
else streak = parseInt(streak);

// 🔥 streak system
let today = new Date().toDateString();

if (lastLogin !== today) {
    streak += 1;
    localStorage.setItem("lastLogin", today);
    localStorage.setItem("streak", streak);
}

// 📊 level system
function getLevel(xp) {
    return Math.floor(xp / 50) + 1;
}

// 🏅 badges
function updateBadges() {
    if (xp >= 50)
        document.getElementById("badge1").innerText =
            "🏅 Beginner Unlocked";

    if (xp >= 150)
        document.getElementById("badge2").innerText =
            "🏅 Focused Student Unlocked";

    if (xp >= 300)
        document.getElementById("badge3").innerText =
            "🏅 Elite Learner Unlocked";
}

// 📊 UI
function updateUI() {
    document.getElementById("xp").innerText = xp;
    document.getElementById("level").innerText = getLevel(xp);
    document.getElementById("streak").innerText = streak;

    localStorage.setItem("xp", xp);

    updateBadges();
}

// 🎯 complete task
function completeTask(points) {
    xp += points;
    updateUI();
}

// 🌙 dark mode
function toggleMode() {
    document.body.classList.toggle("dark");

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark")
    );
}

// 👤 profile
function saveName() {
    let name =
        document.getElementById("nameInput").value;

    if (name !== "") {
        localStorage.setItem("username", name);

        document.getElementById("username").innerText =
            name;
    }
}

function loadName() {
    let saved =
        localStorage.getItem("username");

    if (saved)
        document.getElementById("username").innerText =
            saved;
}

// 🚪 logout
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

// 🧠 AI QUESTS
async function generateQuests() {
    let level = getLevel(xp);

    let container =
        document.getElementById("questContainer");

    container.innerHTML =
        "Loading AI quests...";

    try {
        let res = await fetch(
            "/api/generate-quests",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    level,
                    xp
                })
            }
        );

        let data = await res.json();

        container.innerHTML = "";

        data.quests.forEach(q => {
            let div =
                document.createElement("div");

            div.className = "task";

            div.innerHTML = `
                <p>${q.text}</p>
                <button onclick="completeTask(${q.xp})">
                    +${q.xp} XP
                </button>
            `;

            container.appendChild(div);
        });

    } catch (err) {
        container.innerHTML =
            "Failed to load AI quests.";
    }
}

// 🌙 load dark mode
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}

// 🚀 init
loadName();
updateUI();
generateQuests();
