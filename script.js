// Array para armazenar as tarefas
let tasks = [];

// Elementos DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-name');
const taskTagInput = document.getElementById('task-tag');
const taskList = document.getElementById('task-list');
const taskStats = document.getElementById('task-stats');

// Função para carregar tarefas iniciais
function loadInitialTasks() {
    // Tarefas de exemplo para demonstração
    const initialTasks = [
        { id: 1, name: "Estudar JavaScript", tag: "Estudos", completed: false },
        { id: 2, name: "Fazer exercícios físicos", tag: "Saúde", completed: false },
        { id: 3, name: "Ler um livro", tag: "Lazer", completed: true }
    ];
    
    tasks = initialTasks;
    renderTasks();
    updateStats();
}

// Função para renderizar as tarefas na tela
function renderTasks() {
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <h3>Nenhuma tarefa encontrada</h3>
                <p>Adicione uma nova tarefa usando o formulário acima.</p>
            </div>
        `;
        return;
    }
    
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        
        if (task.completed) {
            taskItem.innerHTML = `
                <div class="task-content">
                    <div class="task-name completed">${task.name}</div>
                    ${task.tag ? `<span class="task-tag">${task.tag}</span>` : ''}
                </div>
                <span class="check-icon">✓</span>
            `;
        } else {
            taskItem.innerHTML = `
                <div class="task-content">
                    <div class="task-name">${task.name}</div>
                    ${task.tag ? `<span class="task-tag">${task.tag}</span>` : ''}
                </div>
                <button class="complete-btn" data-id="${task.id}">Concluir</button>
            `;
        }
        
        taskList.appendChild(taskItem);
    });
    
    // Adicionar event listeners aos botões "Concluir"
    document.querySelectorAll('.complete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const taskId = parseInt(this.getAttribute('data-id'));
            completeTask(taskId);
        });
    });
}

// Função para adicionar uma nova tarefa
function addTask(taskName, taskTag) {
    const newTask = {
        id: Date.now(), // Usando timestamp como ID único
        name: taskName,
        tag: taskTag,
        completed: false
    };
    
    tasks.push(newTask);
    renderTasks();
    updateStats();
}

// Função para marcar uma tarefa como concluída
function completeTask(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, completed: true };
        }
        return task;
    });
    
    renderTasks();
    updateStats();
}

// Função para atualizar as estatísticas
function updateStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    
    taskStats.textContent = `Tarefas concluídas: ${completedTasks} de ${totalTasks}`;
}

// Event listener para o formulário
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const taskName = taskInput.value.trim();
    const taskTag = taskTagInput.value.trim();
    
    if (taskName) {
        addTask(taskName, taskTag);
        taskInput.value = '';
        taskTagInput.value = '';
        taskInput.focus();
    }
});

// Carregar tarefas iniciais quando a página for carregada
document.addEventListener('DOMContentLoaded', loadInitialTasks);