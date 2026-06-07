export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Only POST allowed" });
    }

    const { level, xp } = req.body;

    let quests = [];

    if (level <= 2) {
        quests = [
            { text: "📘 Study basics for 20 minutes", xp: 10 },
            { text: "🧠 Solve 3 beginner questions", xp: 10 },
            { text: "📖 Review notes", xp: 5 }
        ];
    } 
    else if (level <= 5) {
        quests = [
            { text: "📘 Study focused topic for 40 minutes", xp: 20 },
            { text: "🧠 Solve mixed questions", xp: 25 },
            { text: "✍️ Summarize what you learned", xp: 20 }
        ];
    } 
    else {
        quests = [
            { text: "🔥 Deep revision session (1 hour)", xp: 40 },
            { text: "🧠 Solve advanced problems", xp: 50 },
            { text: "📊 Teach a topic to someone", xp: 40 }
        ];
    }

    return res.status(200).json({ quests });
}
