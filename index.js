class Task {
    constructor(title, description, status) {
        this.title = title;
        this.description = description;
        this.status = status;
    }
}

const tasks = [];

function addTask(title, description, status) {
    try {
        const task = new Task(title, description, status);

        // Using a switch statement to handle different task statuses
        switch (status) {
            case 'To Do':
            case 'In Progress':
            case 'Done':
                tasks.push(task);
                displayTasks();
                displayProgress();
                break;
            default:
                throw new Error('Invalid task status');
        }
    } catch (error) {
        console.error(error.message);
    }
}

function changeStatus(index, newStatus) {
    try {
        if (index >= 0 && index < tasks.length) {
            tasks[index].status = newStatus;
            displayTasks();
            displayProgress();
        } else {
            throw new Error('Invalid task index');
        }
    } catch (error) {
        console.error(error.message);
    }
}

function deleteTask(index) {
    try {
        if (index >= 0 && index < tasks.length) {
            tasks.splice(index, 1);
            displayTasks();
            displayProgress();
        } else {
            throw new Error('Invalid task index');
        }
    } catch (error) {
        console.error(error.message);
    }
}

function displayTasks() {
    // Sort tasks by status: To Do > In Progress > Done
    tasks.sort((a, b) => {
        const statusOrder = ['To Do', 'In Progress', 'Done'];
        return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
    });

    const taskListUl = document.getElementById('task-list-ul');
    taskListUl.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const listItem = document.createElement('li');
        let statusClass = '';

        // Apply different background colors based on task status
        switch (task.status) {
            case 'To Do':
                statusClass = 'todo';
                break;
            case 'In Progress':
                statusClass = 'progress';
                break;
            case 'Done':
                statusClass = 'done';
                break;
            default:
                break;
        }

        listItem.innerHTML = `
            <strong>${task.title}</strong> - ${task.description} (Status: ${task.status})
            <button onclick="changeStatus(${i}, 'In Progress')">Start</button>
            <button onclick="changeStatus(${i}, 'Done')">Finish</button>
            <button onclick="deleteTask(${i})">Delete</button>
        `;

        // Add the appropriate status class to the task item
        listItem.classList.add(statusClass);

        taskListUl.appendChild(listItem);
    }
}

function displayProgress() {
    const progressContainer = document.getElementById('progress-container');

    // Check if there are no tasks, set all percentages to 0% and apply default color
    if (tasks.length === 0) {
        progressContainer.innerHTML = `
            <div class="status-bar">
                <div class="status-label">To Do: 0 tasks</div>
                <div class="status-bar-inner">
                    <div class="status-bar-fill default" style="width: 0%;"></div>
                </div>
                <div class="status-percentage">0%</div>
            </div>
            <div class="status-bar">
                <div class="status-label">In Progress: 0 tasks</div>
                <div class="status-bar-inner">
                    <div class="status-bar-fill default" style="width: 0%;"></div>
                </div>
                <div class="status-percentage">0%</div>
            </div>
            <div class="status-bar">
                <div class="status-label">Done: 0 tasks</div>
                <div class="status-bar-inner">
                    <div class="status-bar-fill default" style="width: 0%;"></div>
                </div>
                <div class="status-percentage">0%</div>
            </div>
        `;
    } else {
        // Calculate and display progress when there are tasks
        const todoCount = tasks.filter(task => task.status === 'To Do').length;
        const inProgressCount = tasks.filter(task => task.status === 'In Progress').length;
        const doneCount = tasks.filter(task => task.status === 'Done').length;
        const totalCount = tasks.length;

        const todoPercentage = (todoCount / totalCount) * 100;
        const inProgressPercentage = (inProgressCount / totalCount) * 100;
        const donePercentage = (doneCount / totalCount) * 100;

        progressContainer.innerHTML = `
            <div class="status-bar">
                <div class="status-label">To Do: ${todoCount} tasks</div>
                <div class="status-bar-inner">
                    <div class="status-bar-fill todo" style="width: ${todoPercentage}%;"></div>
                </div>
                <div class="status-percentage">${todoPercentage.toFixed(1)}%</div>
            </div>
            <div class="status-bar">
                <div class="status-label">In Progress: ${inProgressCount} tasks</div>
                <div class="status-bar-inner">
                    <div class="status-bar-fill progress" style="width: ${inProgressPercentage}%;"></div>
                </div>
                <div class="status-percentage">${inProgressPercentage.toFixed(1)}%</div>
            </div>
            <div class="status-bar">
                <div class="status-label">Done: ${doneCount} tasks</div>
                <div class="status-bar-inner">
                    <div class="status-bar-fill done" style="width: ${donePercentage}%;"></div>
                </div>
                <div class="status-percentage">${donePercentage.toFixed(1)}%</div>
            </div>
        `;
    }
}



function handleFormSubmit(event) {
    event.preventDefault();
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const status = document.getElementById('task-status').value;

    addTask(title, description, status);

    // Clear the form fields
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-status').value = '';
}

const taskForm = document.getElementById('add-task-form');
taskForm.addEventListener('submit', handleFormSubmit);

// Initial tasks for demonstration
addTask('Task 1', 'Description 1', 'To Do');
addTask('Task 2', 'Description 2', 'In Progress');
addTask('Task 3', 'Description 3', 'Done');
