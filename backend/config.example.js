// Configurações de exemplo para o backend
// Copie este arquivo para config.js e ajuste as variáveis

module.exports = {
    // Configurações do Banco de Dados
    database: {
        host: process.env.DB_HOST || 'mysql',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'devops123',
        database: process.env.DB_NAME || 'tasks_db'
    },
    
    // Configurações do Servidor
    server: {
        port: process.env.PORT || 5000,
        environment: process.env.NODE_ENV || 'development'
    },
    
    // Configurações de CORS
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
    }
};


