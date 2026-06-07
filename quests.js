import { completeTask } from "./game.js";

/* TASK LIST */
const tasks = [
    { id: "task1", reward: 20 },
    { id: "task2", reward: 50 },
    { id: "task3", reward: 100 }
];

/* INIT TASK BUTTONS */
export function initTasks(){

    tasks.forEach(task => {

        const el = document.getElementById(task.id);

        if(!el) return;

        el.addEventListener("click", () => {
            completeTask(task.id, task.reward);

            el.classList.add("done");
        });
    });
}
