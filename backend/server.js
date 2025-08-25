const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuração do banco de dados
const dbConfig = {
    host: process.env.DB_HOST || 'mysql',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'devops123',
    database: process.env.DB_NAME || 'tasks_db'
};

// Pool de conexões MySQL
let pool;

// Função para conectar ao banco
async function connectDB() {
    try {
        pool = mysql.createPool(dbConfig);
        console.log('✅ Conectado ao MySQL');
    } catch (error) {
        console.error('❌ Erro ao conectar ao MySQL:', error);
        process.exit(1);
    }
}

// Conectar ao banco na inicialização
connectDB();

// Rotas da API - SIMPLES E DIRETAS

// GET /health - Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'Tasks API',
        version: '1.0.0'
    });
});

// GET /tasks - Listar todas as tarefas
app.get('/tasks', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM tasks ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// POST /tasks - Criar nova tarefa
app.post('/tasks', async (req, res) => {
    try {
        const { title, description } = req.body;
        
        if (!title) {
            return res.status(400).json({ error: 'Título é obrigatório' });
        }

        const [result] = await pool.execute(
            'INSERT INTO tasks (title, description) VALUES (?, ?)',
            [title, description || '']
        );

        const [newTask] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
        res.status(201).json(newTask[0]);
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// PUT /tasks/:id - Atualizar tarefa
app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        const [result] = await pool.execute(
            'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
            [title, description, completed, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }

        const [updatedTask] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [id]);
        res.json(updatedTask[0]);
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// DELETE /tasks/:id - Deletar tarefa
app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const [result] = await pool.execute('DELETE FROM tasks WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }

        res.json({ message: 'Tarefa deletada com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🔗 API: http://localhost:${PORT}/tasks`);
});
