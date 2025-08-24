# 📹 INSTRUÇÕES PARA GRAVAÇÃO DO VÍDEO

## **OBJETIVO DO VÍDEO**
Demonstrar todo o processo DevOps: desenvolvimento local, versionamento com Git, deploy automático na AWS via GitHub Actions.

## **DURAÇÃO SUGERIDA: 15-20 minutos**

---

## **📋 ROTEIRO DO VÍDEO**

### **PARTE 1: APRESENTAÇÃO DO PROJETO (2-3 min)**
- Mostrar a aplicação rodando localmente
- Explicar que é uma lista de tarefas com frontend/backend
- Demonstrar funcionalidades: criar, editar, deletar, marcar como concluída
- Mostrar que está rodando em containers Docker

### **PARTE 2: ESTRUTURA DO PROJETO (3-4 min)**
- Mostrar a estrutura de pastas
- Explicar cada componente:
  - `frontend/` - HTML, CSS, JavaScript
  - `backend/` - Node.js + Express + MySQL
  - `database/` - Scripts SQL
  - `docker-compose.yml` - Orquestração
  - `.github/workflows/` - GitHub Actions

### **PARTE 3: DESENVOLVIMENTO LOCAL (3-4 min)**
- Mostrar como executar localmente:
  ```bash
  docker-compose up -d
  ```
- Acessar:
  - Frontend: http://localhost:3000
  - Backend: http://localhost:5000
  - PhpMyAdmin: http://localhost:8080
- Demonstrar que tudo funciona perfeitamente

### **PARTE 4: VERSIONAMENTO COM GIT (3-4 min)**
- Mostrar as 3 branches: `dev`, `staging`, `master`
- Explicar o workflow:
  1. Desenvolvimento na branch `dev`
  2. Testes na branch `staging`
  3. Deploy automático na `master`
- Fazer um commit e push para demonstrar

### **PARTE 5: DEPLOY AUTOMÁTICO NA AWS (4-5 min)**
- Mostrar a instância EC2 na AWS
- Explicar que o GitHub Actions detecta mudanças na `master`
- Mostrar o workflow rodando no GitHub
- Demonstrar o deploy automático
- Mostrar a aplicação funcionando na AWS
- Comparar: antes (versão antiga) vs depois (nova versão)

---

## **🎬 CENAS OBRIGATÓRIAS**

### **1. APLICAÇÃO FUNCIONANDO LOCALMENTE**
- Tela cheia da aplicação rodando
- Criar uma nova tarefa
- Editar uma tarefa existente
- Marcar como concluída

### **2. CONTAINERS DOCKER**
- Terminal mostrando `docker ps`
- Explicar cada container: frontend, backend, mysql, phpmyadmin

### **3. ESTRUTURA DO CÓDIGO**
- VS Code ou editor mostrando a organização das pastas
- Explicar cada arquivo importante

### **4. GITHUB E BRANCHES**
- Mostrar o repositório no GitHub
- Explicar as 3 branches
- Fazer um commit e push

### **5. GITHUB ACTIONS**
- Mostrar o workflow rodando
- Explicar cada etapa do processo

### **6. AWS EC2**
- Mostrar a instância rodando
- Acessar a aplicação via IP público
- Demonstrar que está funcionando

### **7. COMPARAÇÃO ANTES/DEPOIS**
- Mostrar a aplicação antes da atualização
- Fazer o deploy
- Mostrar a aplicação após a atualização
- Explicar as mudanças

---

## **💡 DICAS PARA GRAVAÇÃO**

### **PREPARAÇÃO**
- Teste tudo antes de gravar
- Tenha todos os comandos prontos
- Prepare um roteiro detalhado
- Teste a conexão com a AWS

### **DURANTE A GRAVAÇÃO**
- Fale pausadamente e claramente
- Explique cada passo
- Mostre as telas com calma
- Se algo der errado, explique e corrija

### **EDITAÇÃO**
- Corte pausas longas
- Adicione legendas para comandos importantes
- Use zoom nas partes importantes
- Mantenha um ritmo constante

---

## **🔧 COMANDOS IMPORTANTES PARA MOSTRAR**

```bash
# Local
docker-compose up -d
docker ps
docker logs backend

# Git
git branch -a
git checkout dev
git add .
git commit -m "feat: nova funcionalidade"
git push origin dev

# AWS
ssh -i chave.pem admin@IP_EC2
docker-compose -f docker-compose.prod.yml up -d
```

---

## **✅ CHECKLIST FINAL**

- [ ] Aplicação funcionando localmente
- [ ] Containers Docker rodando
- [ ] Estrutura do projeto explicada
- [ ] Git e branches demonstrados
- [ ] GitHub Actions funcionando
- [ ] Deploy na AWS funcionando
- [ ] Comparação antes/depois mostrada
- [ ] Tudo funcionando perfeitamente

---

## **🎯 PONTOS CHAVE PARA DESTACAR**

1. **Containerização**: Tudo rodando em Docker
2. **API**: Frontend e backend se comunicando
3. **Git Workflow**: 3 branches organizadas
4. **Automação**: GitHub Actions fazendo deploy
5. **Cloud**: AWS EC2 com deploy automático
6. **DevOps**: Desenvolvimento → Teste → Deploy automático

**BOA SORTE! 🚀**


