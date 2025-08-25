// Configuração da API - SIMPLES E DIRETA
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : `http://${window.location.hostname}:5000`;

// Elementos do DOM
const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const tasksList = document.getElementById('tasksList');
const apiStatus = document.getElementById('apiStatus');

// Estado da aplicação
let tasks = [];
let editingTaskId = null;

// Função para verificar status da API
async function checkApiStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        if (response.ok) {
            apiStatus.textContent = '✅ Conectado';
            apiStatus.className = 'success';
            return true;
        } else {
            throw new Error('API não respondeu corretamente');
        }
    } catch (error) {
        apiStatus.textContent = '❌ Erro de conexão';
        apiStatus.className = 'error';
        return false;
    }
}

// Função para carregar tarefas
async function loadTasks() {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`);
        if (response.ok) {
            tasks = await response.json();
            renderTasks();
        } else {
            throw new Error('Erro ao carregar tarefas');
        }
    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
        tasksList.innerHTML = '<div class="loading">Erro ao carregar tarefas. Verifique se a API está rodando.</div>';
    }
}

// Função para renderizar tarefas
function renderTasks() {
    if (tasks.length === 0) {
        tasksList.innerHTML = '<div class="loading">Nenhuma tarefa encontrada. Crie sua primeira tarefa!</div>';
        return;
    }

    tasksList.innerHTML = tasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <div class="task-header">
                <div class="task-title">${task.title}</div>
                <div class="task-actions">
                    <button class="btn-toggle" onclick="toggleTask(${task.id})">
                        ${task.completed ? '🔄 Reabrir' : '✅ Concluir'}
                    </button>
                    <button class="btn-edit" onclick="editTask(${task.id})">
                        ✏️ Editar
                    </button>
                    <button class="btn-delete" onclick="deleteTask(${task.id})">
                        🗑️ Deletar
                    </button>
                </div>
            </div>
            ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
            <div class="task-meta">
                Criada em: ${new Date(task.created_at).toLocaleString('pt-BR')}
                ${task.updated_at !== task.created_at ? 
                    ` | Atualizada em: ${new Date(task.updated_at).toLocaleString('pt-BR')}` : ''}
            </div>
        </div>
    `).join('');
}

// Função para criar tarefa
async function createTask(title, description) {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description })
        });

        if (response.ok) {
            await loadTasks();
            return true;
        } else {
            throw new Error('Erro ao criar tarefa');
        }
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        alert('Erro ao criar tarefa. Tente novamente.');
        return false;
    }
}

// Função para atualizar tarefa
async function updateTask(id, title, description, completed) {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, completed })
        });

        if (response.ok) {
            await loadTasks();
            return true;
        } else {
            throw new Error('Erro ao atualizar tarefa');
        }
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        alert('Erro ao atualizar tarefa. Tente novamente.');
        return false;
    }
}

// Função para deletar tarefa
async function deleteTask(id) {
    if (!confirm('Tem certeza que deseja deletar esta tarefa?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            await loadTasks();
        } else {
            throw new Error('Erro ao deletar tarefa');
        }
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
        alert('Erro ao deletar tarefa. Tente novamente.');
    }
}

// Função para alternar status da tarefa
async function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        await updateTask(id, task.title, task.description, !task.completed);
    }
}

// Função para editar tarefa
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        editingTaskId = id;
        taskTitle.value = task.title;
        taskDescription.value = task.description || '';
        
        // Mudar o botão para "Atualizar"
        const submitButton = taskForm.querySelector('button[type="submit"]');
        submitButton.textContent = '✏️ Atualizar Tarefa';
    }
}

// Função para cancelar edição
function cancelEdit() {
    editingTaskId = null;
    taskForm.reset();
    const submitButton = taskForm.querySelector('button[type="submit"]');
    submitButton.textContent = '➕ Adicionar Tarefa';
}

// Event listener para o formulário
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    
    if (!title) {
        alert('Por favor, insira um título para a tarefa.');
        return;
    }
    
    let success = false;
    
    if (editingTaskId) {
        // Atualizando tarefa existente
        success = await updateTask(editingTaskId, title, description, false);
        if (success) {
            cancelEdit();
        }
    } else {
        // Criando nova tarefa
        success = await createTask(title, description);
        if (success) {
            taskForm.reset();
        }
    }
});

// Inicialização da aplicação
async function init() {
    // Verificar status da API
    await checkApiStatus();
    
    // Carregar tarefas se a API estiver funcionando
    if (apiStatus.className === 'success') {
        await loadTasks();
    }
    
    // Verificar status a cada 30 segundos
    setInterval(checkApiStatus, 30000);
}

// Iniciar aplicação quando a página carregar
document.addEventListener('DOMContentLoaded', init);


