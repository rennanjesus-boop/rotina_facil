let tasks = JSON.parse(localStorage.getItem("rotinaTasks")) || [
{ name: "Acordar", time: "07:00", done: false },
{ name: "Tomar café da manhã", time: "07:30", done: false },
{ name: "Estudar", time: "08:00", done: false },
{ name: "Almoçar", time: "12:00", done: false },
{ name: "Descansar", time: "13:00", done: false }
];

let currentFilter = "all";

function saveTasks() {
localStorage.setItem("rotinaTasks", JSON.stringify(tasks));
}

function renderTasks() {
const list = document.getElementById("task-list");
list.innerHTML = "";

let visibleTasks = tasks.filter(task => {
if (currentFilter === "pending") return !task.done;
if (currentFilter === "done") return task.done;
return true;
});

visibleTasks.sort((a, b) => a.time.localeCompare(b.time));

if (visibleTasks.length === 0) {
list.innerHTML = "<p>Nenhuma atividade por aqui 😊</p>";
}

visibleTasks.forEach(task => {
const index = tasks.indexOf(task);

const item = document.createElement("div");
item.className = "task" + (task.done ? " done" : "");

const info = document.createElement("div");
info.className = "task-info";

const time = document.createElement("strong");
time.textContent = task.time + " ";

const name = document.createElement("span");
name.textContent = task.name;

info.append(time, name);

const complete = document.createElement("button");
complete.textContent = task.done ? "Desfazer" : "Concluir";
complete.onclick = () => {
tasks[index].done = !tasks[index].done;
updateApp();
};

const remove = document.createElement("button");
remove.textContent = "Excluir";
remove.className = "delete";
remove.onclick = () => {
tasks.splice(index, 1);
updateApp();
};

item.append(info, complete, remove);
list.appendChild(item);
});

updateProgress();
}

function addTask() {
const nameInput = document.getElementById("task-name");
const timeInput = document.getElementById("task-time");

const name = nameInput.value.trim();
const time = timeInput.value;

if (!name || !time) {
alert("Digite o nome e o horário da atividade!");
return;
}

tasks.push({
name: name,
time: time,
done: false
});

nameInput.value = "";
timeInput.value = "";

updateApp();
}

function filterTasks(filter) {
currentFilter = filter;
renderTasks();
}

function updateProgress() {
const completed = tasks.filter(task => task.done).length;
const percentage = tasks.length === 0
? 0
: Math.round((completed / tasks.length) * 100);

document.getElementById("progress-fill").style.width =
percentage + "%";

document.getElementById("progress-text").textContent =
percentage + "% concluído (" +
completed + " de " + tasks.length + " atividades)";
}

function updateApp() {
saveTasks();
renderTasks();
}

renderTasks();
