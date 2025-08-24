# Projeto DevOps - Lista de Tarefas

## Descrição
Aplicação simples de Lista de Tarefas com frontend e backend, containerizada com Docker e deploy automático na AWS via GitHub Actions.

## Estrutura
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js + Express
- **Banco**: MySQL
- **Containerização**: Docker
- **CI/CD**: GitHub Actions
- **Deploy**: AWS EC2

## Branches
- `dev`: Desenvolvimento
- `staging`: Testes
- `master`: Produção

## Como executar localmente
```bash
# Clonar o repositório
git clone https://github.com/isisxavier/2024-devops.git
cd 2024-devops

# Executar com Docker
docker-compose up -d

# Acessar a aplicação
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# PhpMyAdmin: http://localhost:8080
```

## Deploy
O deploy é automático via GitHub Actions quando há push para a branch `master`.


