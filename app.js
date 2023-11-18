document.addEventListener("DOMContentLoaded", () => {
  const newTaskInput = document.getElementById("new-task");
  const addBtn = document.getElementById("add-btn");
  const taskList = document.getElementById("list-task");
  const allTaskComplete = document.getElementById("complete-all");
  const allTaskRemove = document.getElementById("remove-all");

  const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  savedTasks.forEach(createTaskElement);

  addBtn.addEventListener("click", addTask);
  newTaskInput.addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
      addTask();
    }
  });

  function addTask() {
    const taskText = newTaskInput.value;
    if (taskText !== "") {
      const task = {
        text: taskText,
        completed: false,
      };
      createTaskElement(task);
      newTaskInput.value = "";
      saveTasksToLocalStorage();
    }
  }

  function createTaskElement(task) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    const taskText = document.createElement("span");
    taskText.innerText = task.text;
    taskText.classList.add("task-text");

    const completeBtn = document.createElement("button");
    completeBtn.innerText = task.completed ? "Ricomincia" : "Completata";
    completeBtn.classList.add("complete-btn");
    completeBtn.addEventListener("click", () => {
      task.completed = !task.completed;
      taskItem.classList.toggle("completed");
      completeBtn.innerText = task.completed ? "Ricomincia" : "Completata";
      saveTasksToLocalStorage();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Elimina";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      taskList.removeChild(taskItem);
      saveTasksToLocalStorage();
    });

    const editBtn = document.createElement("button");
    editBtn.innerText = "Modifica";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", () => {
      const taskTextInput = document.createElement("input");
      taskTextInput.type = "text";
      taskTextInput.value = task.text;

      taskItem.replaceChild(taskTextInput, taskText);

      editBtn.style.display = "none";

      const saveBtn = document.createElement("button");
      saveBtn.innerText = "Salva";
      saveBtn.classList.add("save-btn");
      saveBtn.addEventListener("click", () => {
        const newText = taskTextInput.value.trim();
        if (newText !== "") {
          task.text = newText;
          taskText.innerText = newText;
        }

        taskItem.replaceChild(taskText, taskTextInput);
        taskItem.removeChild(saveBtn);
        editBtn.style.display = "inline-block";
        saveTasksToLocalStorage();
      });

      taskItem.appendChild(saveBtn);
    });

    taskItem.appendChild(taskText);
    taskItem.appendChild(completeBtn);
    taskItem.appendChild(deleteBtn);
    taskItem.appendChild(editBtn);

    if (task.completed) {
      taskItem.classList.add("completed");
    }

    taskList.appendChild(taskItem);
  }

  function saveTasksToLocalStorage() {
    const tasks = Array.from(taskList.children).map((taskItem) => ({
      text: taskItem.querySelector(".task-text").innerText,
      completed: taskItem.classList.contains("completed"),
    }));

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  allTaskComplete.addEventListener("click", () => {
    const taskItems = taskList.querySelectorAll(".task-item");
    const completeBtn = allTaskComplete;

    if (completeBtn.innerText === "Completa Tutto") {
      taskItems.forEach((taskItem) => {
        taskItem.classList.add("completed");
        const individualCompleteBtn = taskItem.querySelector(".complete-btn");
        individualCompleteBtn.disabled = true;
        individualCompleteBtn.innerText = "Ricomincia";
      });

      completeBtn.innerText = "Ricomincia";
    } else {
      taskItems.forEach((taskItem) => {
        taskItem.classList.remove("completed");
        const individualCompleteBtn = taskItem.querySelector(".complete-btn");
        individualCompleteBtn.disabled = false;
        individualCompleteBtn.innerText = "Completata";
      });

      completeBtn.innerText = "Completa Tutto";
    }

    saveTasksToLocalStorage();
  });

  allTaskRemove.addEventListener("click", () => {
    taskList.innerHTML = "";
    saveTasksToLocalStorage();
  });
});

//CAMBIO TEMA

const changeTheme = document.getElementById("change-theme");
const body = document.body;

changeTheme.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  body.classList.toggle("light-theme");
});

function updateTheme() {
  const body = document.body;
  const themeClass = body.classList.contains("dark-theme")
    ? "dark-theme"
    : "light-theme";
  const taskList = document.getElementById("new-task");
  taskList.className = `new-task ${themeClass}`;
}
