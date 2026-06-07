import { completeTask } from "./game.js";

const tasks = [
  { id: "task1", reward: 20 },
  { id: "task2", reward: 50 },
  { id: "task3", reward: 100 }
];

export function initTasks() {
  tasks.forEach(t => {
    const el = document.getElementById(t.id);
    if (!el) return;

    el.addEventListener("click", () => {
      completeTask(t.id, t.reward);
      el.classList.add("done");
    });
  });
}
