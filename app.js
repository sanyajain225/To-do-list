document.addEventListener("DOMContentLoaded" , ()=> {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"))

    if(storedTasks){
        storedTasks.forEach((task)=> tasks.push(task))
        updateTasksList();
        updateStats();
    }
});

let tasks = []; // Initialize the tasks array

const  saveTasks = ()=> {
    localStorage.setItem('tasks' , JSON.stringify(tasks))
}
// Add a new task
const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false }); // Add task to the array
        taskInput.value = ""; // Clear input field
        updateTasksList(); // Update the task list and stats
        updateStats();
        saveTasks();
    }
};

// Update the task list and stats
const updateTasksList = () => {
    const taskList = document.querySelector(".task-list");
    const progress = document.getElementById("progress");
    const numbers = document.getElementById("numbers");

    taskList.innerHTML = ""; // Clear the task list

    // Render tasks
    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("taskItem");

        listItem.innerHTML = `
            <div class="task ${task.completed ? "completed":""}">
                <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTaskComplete(${index})">
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="edit.png" alt="Edit Task" onclick="editTask(${index})">
                <img src="bin.png" alt="Delete Task" onclick="deleteTask(${index})">
            </div>
        `;
        taskList.appendChild(listItem);
    });

    // Update progress and stats
    const completedCount = tasks.filter(task => task.completed).length;
    const totalCount = tasks.length;
    const progressPercentage = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

    progress.style.width = `${progressPercentage}%`;
    numbers.textContent = `${completedCount} / ${totalCount}`;
};

// Toggle task complete
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed; // Toggle completion status

    updateTasksList(); // Refresh the task list and stats
    updateStats();
    saveTasks();
};

// Delete a task
const deleteTask = (index) => {
    tasks.splice(index, 1); // Remove the task from the array
    updateTasksList(); // Refresh the task list and stats
    updateStats();
    saveTasks();
};

// Edit a task
const editTask = (index) => {
    const taskInput = document.getElementById('taskInput')
    taskInput.value = tasks[index].text

    tasks.splice(index,1)
    updateTasksList()
    updateStats();
    saveTasks();
};

const updateStats = ()=> {
    const completeTasks = tasks.filter(task => task.completed).length
    const totalTasks = tasks.length
    const progress = (completeTasks/totalTasks)*100

 const progressBar = document.getElementById('progress')
 progressBar.style.width = `${progress}%`

 document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`

 if(tasks.length && completeTasks === totalTasks){
    blastConfetti();
 }

};

// Handle form submission
document.getElementById("taskForm").addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    addTask(); // Add the new task
});

const blastConfetti = ()=>{
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}