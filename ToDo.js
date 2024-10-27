let fontSize = 16;
let currentFontIndex = 0;
const fontStyles = [
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'Georgia'
];

function updateTaskStats() {
    const totalTasks = document.getElementById('taskList').children.length;
    const completedTasks = document.querySelectorAll('.task-text.completed').length;
    
    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
}

function addTask() {
    const input = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    
    if (input.value.trim() !== '') {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        // Create task content container
        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';
        
        // Create checkbox
        const checkbox = document.createElement('div');
        checkbox.className = 'task-checkbox';
        checkbox.innerHTML = '<i class="fas fa-check"></i>';
        checkbox.onclick = function(e) {
            e.stopPropagation();
            toggleTaskCompletion(this, taskText);
        };
        
        // Create task text
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = input.value;
        
        // Create actions container
        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';
        
        // Create edit button
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.title = 'Edit task';
        editBtn.onclick = function(e) {
            e.stopPropagation();
            startEditing(taskText);
        };
        
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteBtn.title = 'Delete task';
        deleteBtn.onclick = function(e) {
            e.stopPropagation();
            li.style.transform = 'translateX(100px)';
            li.style.opacity = '0';
            setTimeout(() => {
                li.remove();
                updateTaskStats();
            }, 300);
        };
        
        // Assemble the task item
        taskContent.appendChild(checkbox);
        taskContent.appendChild(taskText);
        taskActions.appendChild(editBtn);
        taskActions.appendChild(deleteBtn);
        li.appendChild(taskContent);
        li.appendChild(taskActions);
        taskList.appendChild(li);
        
        input.value = '';
        input.focus();
        updateTaskStats();
    }
}

function toggleTaskCompletion(checkbox, taskText) {
    checkbox.classList.toggle('checked');
    taskText.classList.toggle('completed');
    updateTaskStats();
}

function startEditing(taskText) {
    const currentText = taskText.textContent;
    taskText.classList.add('editing');
    taskText.contentEditable = true;
    taskText.focus();
    
    // Select all text
    const range = document.createRange();
    range.selectNodeContents(taskText);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    
    // Save on Enter, cancel on Escape
    function handleEdit(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            finishEditing(taskText);
        } else if (e.key === 'Escape') {
            taskText.textContent = currentText;
            finishEditing(taskText);
        }
    }
    
    taskText.addEventListener('keydown', handleEdit);
    taskText.addEventListener('blur', () => finishEditing(taskText));
}

function finishEditing(taskText) {
    taskText.contentEditable = false;
    taskText.classList.remove('editing');
    if (taskText.textContent.trim() === '') {
        taskText.closest('.task-item').remove();
        updateTaskStats();
    }
}

// Rest of the JavaScript (background color, font size, etc.) remains the same...

// Add task when Enter key is pressed in the input field
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initialize task stats
updateTaskStats();

function changeBackgroundColor() {
    const color = document.getElementById('bgColor').value;
    document.documentElement.style.setProperty('--background-color', color);
}

function changeFontSize(change) {
    fontSize += change;
    if (fontSize < 12) fontSize = 12;
    if (fontSize > 24) fontSize = 24;
    document.body.style.fontSize = fontSize + 'px';
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const button = event.target.closest('button');
    const icon = button.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

function changeFontStyle() {
    currentFontIndex = (currentFontIndex + 1) % fontStyles.length;
    document.body.style.fontFamily = fontStyles[currentFontIndex];
}