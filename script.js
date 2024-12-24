document.addEventListener("DOMContentLoaded", () => {
  const toDoInput = document.querySelector("#todo-input");
  const addTaskBtn = document.querySelector("#add-task-btn");
  const list = document.querySelector("#todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    renderTask(task);
  });

  addTaskBtn.addEventListener("click", () => {
    const taskText = toDoInput.value.trim();
    if (taskText === "") return;
    let newTask = {
      id: Date.now(),
      text: taskText,
      complete: false,
    };

    tasks.push(newTask);
    saveTaskLocalStorage();
    renderTask(newTask);
    toDoInput.value = "";
    console.log(tasks);
  });
  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-ID", task.id);
    li.innerHTML = `
     <span>${task.text}</span>
     <button>delete</button>
    `;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.complete = !task.complete;
      li.classList.toggle("complete");
      saveTaskLocalStorage();
    });
    list.appendChild(li);
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTaskLocalStorage();
    });
  }
  function saveTaskLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
