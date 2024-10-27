const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const tasksCount = document.getElementById('tasks-count');
const clearAllBtn = document.getElementById('clear-all');

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
clearAllBtn.addEventListener('click', clearAllTasks);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
        taskInput.value = '';
        updateTasksCount();
    }
}

function createTaskElement(taskText) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'task-actions';
    
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.className = 'edit-btn';
    editBtn.title = 'Edit task';
    editBtn.addEventListener('click', () => editTask(taskSpan));
    
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.className = 'delete-btn';
    deleteBtn.title = 'Delete task';
    deleteBtn.addEventListener('click', () => {
        taskItem.remove();
        updateTasksCount();
    });
    
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);
    
    taskItem.appendChild(taskSpan);
    taskItem.appendChild(actionsDiv);
    
    return taskItem;
}

function editTask(taskSpan) {
    const currentText = taskSpan.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.style.width = '100%';
    input.style.padding = '5px';
    input.style.border = '2px solid #764ba2';
    input.style.borderRadius = '5px';
    
    taskSpan.parentNode.replaceChild(input, taskSpan);
    input.focus();
    
    function saveEdit() {
        const newText = input.value.trim();
        if (newText) {
            taskSpan.textContent = newText;
        }
        input.parentNode.replaceChild(taskSpan, input);
    }
    
    input.addEventListener('blur', saveEdit);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        }
    });
}

function updateTasksCount() {
    const count = taskList.children.length;
    tasksCount.textContent = `${count} task${count !== 1 ? 's' : ''}`;
}

function clearAllTasks() {
    if (confirm('Are you sure you want to clear all tasks?')) {
        taskList.innerHTML = '';
        updateTasksCount();
    }
}