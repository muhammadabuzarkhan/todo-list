// Select DOM elements
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Event listener for adding a task
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addTask(newTaskInput.value);
    newTaskInput.value = '';
});

// Function to add a new task
function addTask(task) {
    if (task === '') return;

    const li = document.createElement('li');
    li.textContent = task;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    storeTaskInLocalStorage(task);

    deleteBtn.addEventListener('click', removeTask);
    li.addEventListener('click', toggleComplete);
}

// Function to remove a task
function removeTask(e) {
    if (confirm('Are you sure you want to delete this task?')) {
        const taskItem = e.target.parentElement;
        removeTaskFromLocalStorage(taskItem);
        taskItem.remove();
    }
}

// Function to toggle task completion
function toggleComplete(e) {
    const taskItem = e.target;
    taskItem.classList.toggle('completed');
}

// Store tasks in local storage
function storeTaskInLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from local storage
function getTasksFromLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

// Load tasks from local storage
function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(function(task) {
        addTask(task);
    });
}

// Remove tasks from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task !== taskItem.firstChild.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
