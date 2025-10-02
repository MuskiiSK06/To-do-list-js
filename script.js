document.addEventListener("DOMContentLoaded", () => {
  const date = new Date();
  const currDate = date.toDateString();
  const dateHeader = document.getElementById("dateHeader");

  dateHeader.innerHTML = `Today's Date: ${currDate}`;

  const inputBox = document.getElementById("input-box");
  const taskList = document.getElementById("task-list");
  const addbtn = document.getElementById("add-btn");
  const paragraph = document.getElementById("paragraph");

  // Load saved tasks on startup
  loadTask();

  // Add button
  addbtn.addEventListener("click", addTask);

  // Enter key
  inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") addTask();
  });

  function addTask() {
    const tasks = inputBox.value.trim();
    if (tasks === "") {
      alert("Enter your Task");
      return;
    }

    createElementTask(tasks); // create DOM only
    inputBox.value = "";
    saveTasks(); // persist after adding
    showParagraph();
  }

  function createElementTask(taskText, savedStatus = "not-started", persist = false) {
    // taskText: string
    // savedStatus: optional status value for select
    // persist: if true, call saveTasks (we don't call it when loading from storage)
    const li = document.createElement("li");

    // span for task text
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = taskText;

    // dropdown (status)
    const select = document.createElement("select");
    select.innerHTML = `
      <option value="not-started">⛔ Not Started</option>
      <option value="in-progress">⌛ In Progress</option>
      <option value="done">✅ Done</option>`;
    select.value = savedStatus || "not-started";

    // update storage when status changes (optional: keeps status persistent)
    select.addEventListener("change", () => {
      saveTasks();
    });

    // delete button
    const delBtn = document.createElement("button");
    delBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    delBtn.addEventListener("click", function () {
      li.remove();
      saveTasks(); // persist deletion
      showParagraph();
    });

    // append in the right order: span (task), select, delete button
    li.appendChild(span);
    li.appendChild(select);
    li.appendChild(delBtn);

    taskList.appendChild(li);

    if (persist) saveTasks();
    showParagraph();
  }

  // hide/show "no tasks" message
  function showParagraph() {
    if (taskList.children.length === 0) {
      paragraph.style.visibility = "visible";
    } else {
      paragraph.style.visibility = "hidden";
    }
  }

  // Save tasks: store an array of objects {text, status}
  function saveTasks() {
    const tasksArr = [];
    taskList.querySelectorAll("li").forEach(function (li) {
      // Get the .task-text span (if not present fall back to li.textContent)
      const span = li.querySelector(".task-text");
      const select = li.querySelector("select");
      const text = span ? span.textContent.trim() : li.textContent.trim();
      const status = select ? select.value : "not-started";
      tasksArr.push({ text, status });
    });

    localStorage.setItem("tasks", JSON.stringify(tasksArr));
  }

  // Load tasks from localStorage
  function loadTask() {
    // clear existing so we don't duplicate on multiple calls
    taskList.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((t) => {
      // createElementTask(..., savedStatus, persist=false) -> don't save again during load
      createElementTask(t.text, t.status, false);
    });

    showParagraph();
  }
});
