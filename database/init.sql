-- Criação da tabela de tarefas
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserir algumas tarefas de exemplo
INSERT INTO tasks (title, description) VALUES
('Configurar Docker', 'Configurar containers para o projeto DevOps'),
('Implementar API', 'Criar endpoints para CRUD de tarefas'),
('Configurar GitHub Actions', 'Automatizar deploy na AWS'),
('Testar aplicação', 'Verificar funcionamento local e remoto');


