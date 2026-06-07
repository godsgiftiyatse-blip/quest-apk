const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🧠 AI logic (upgradeable later to real OpenAI)
function generateQuests(level, xp) {
    let quests = [];

    if (level <= 2) {
        quests = [
            { text: "📘 Study basics for 20 minutes", xp: 10 },
            { text: "🧠 Solve 3 beginner questions", xp: 10 },
            { text: "📖 Review notes", xp: 5 }
        ];
    } else if (level <= 5) {
        quests = [
            { text: "📘 Study focused topic for 40 minutes", xp: 20 },
            { text: "🧠 Solve mixed questions", xp: 25 },
            { text: "✍️ Summarize what you learned", xp: 20 }
        ];
    } else {
        quests = [
            { text: "🔥 Deep revision session (1 hour)", xp: 40 },
            { text: "🧠 Solve advanced problems", xp: 50 },
            { text: "📊 Teach a topic to someone", xp: 40 }
        ];
    }

    return quests;
}

// API route
app.post("/generate-quests", (req, res) => {
    const { level, xp } = req.body;

    const quests = generateQuests(level, xp);

    res.json({ quests });
});

app.listen(3000, () => {
    console.log("QUEST AI server running on http://localhost:3000");
});