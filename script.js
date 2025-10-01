// date header
const date = new Date();
const currDate = date.toDateString()

const dateHeader = document.getElementById("dateHeader");

dateHeader.innerHTML = `Today's Date: ${currDate}`;


let inputBox = document.getElementById("input-box");
let taskList = document.getElementById("task-list");
let addbtn = document.getElementById("add-btn");
let paragraph = document.getElementById("paragraph")

function addTask(){
    if(inputBox.value === " "){
        alert("You must Add task");
        const task = {id: DataTransfer.now(),text:taskText};
        addTaskElement(task);
        saveTask(task);
    }
    else{
       let li = document.createElement("li");
        // task text
        let span = document.createElement("span");
        span.textContent = inputBox.value;

        // dropdown
        let select = document.createElement("select");
        select.innerHTML = `
            <option value="not-started">⛔ Not Started</option>
            <option value="in-progress">⌛ In Progress</option>
            <option value="done">✅ Done</option>
        `;

        // delete button
        let delBtn = document.createElement("button");
        delBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        delBtn.addEventListener("click", function() {
            li.remove();
            showParagraph();
        });


        // put them all inside <li>
        li.appendChild(span);
        li.appendChild(select);
        li.appendChild(delBtn);

        // finally append to list
        taskList.appendChild(li);
    }
    inputBox.value = "";
    showParagraph()
}

// no message display
function showParagraph(){
    if(taskList.children.length === 0){
        paragraph.style.visibility = "visible";
    }
    else{
        paragraph.style.visibility = "hidden";
    }
}

// optional: add task on pressing Enter
inputBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});


// window.addEventListener("load", () =>{
//     const task = JSON.parse(localStorage.getItem("tasks")) || [];
//     task.forEach(task => {
//         addEventListener(task);
//     });
// })


