# 🚀 PASSO A PASSO COMPLETO - PROJETO DEVOPS

## **📋 RESUMO DO PROJETO**
Criar uma aplicação de Lista de Tarefas com:
- ✅ Frontend (HTML/CSS/JavaScript)
- ✅ Backend (Node.js + Express + MySQL)
- ✅ Containerização (Docker)
- ✅ Versionamento (Git + 3 branches)
- ✅ CI/CD (GitHub Actions)
- ✅ Deploy automático na AWS EC2

---

## **🎯 ETAPA 1: PREPARAÇÃO LOCAL (30 min)**

### **1.1 Verificar dependências**
```bash
# Verificar se o Docker está instalado
docker --version
docker-compose --version

# Se não estiver instalado, baixe em: https://www.docker.com/
```

### **1.2 Testar aplicação localmente**
```bash
# Navegar para o diretório do projeto
cd devps

# Executar aplicação
docker-compose up -d

# Verificar status
docker ps

# Acessar aplicação:
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# PhpMyAdmin: http://localhost:8080
```

### **1.3 Testar funcionalidades**
- ✅ Criar nova tarefa
- ✅ Editar tarefa existente
- ✅ Marcar como concluída
- ✅ Deletar tarefa
- ✅ Verificar comunicação frontend/backend

---

## **🎯 ETAPA 2: CONFIGURAÇÃO DO GIT (15 min)**

### **2.1 Configurar repositório local**
```bash
# Inicializar Git
git init

# Adicionar arquivos
git add .

# Primeiro commit
git commit -m "feat: projeto inicial com frontend, backend e docker"

# Adicionar repositório remoto
git remote add origin https://github.com/isisxavier/2024-devops.git
```

### **2.2 Criar e configurar branches**
```bash
# Criar branch dev
git checkout -b dev

# Fazer push das branches
git push -u origin dev
git push -u origin master
git push -u origin staging
```

### **2.3 Verificar estrutura no GitHub**
- ✅ Repositório criado
- ✅ 3 branches: dev, staging, master
- ✅ Código sincronizado

---

## **🎯 ETAPA 3: CONFIGURAÇÃO DO DOCKER HUB (10 min)**

### **3.1 Fazer login no Docker Hub**
```bash
docker login
# Usuário: isisxavier
# Senha: [sua senha]
```

### **3.2 Construir e fazer push das imagens**
```bash
# Construir imagens
docker build -t isisxavier/2024-devops:frontend ./frontend
docker build -t isisxavier/2024-devops:backend ./backend

# Fazer push
docker push isisxavier/2024-devops:frontend
docker push isisxavier/2024-devops:backend
```

---

## **🎯 ETAPA 4: CONFIGURAÇÃO DA AWS EC2 (45 min)**

### **4.1 Conectar na instância**
```bash
# Via PuTTY (Windows)
# 1. Abrir PuTTY
# 2. Host: admin@SEU_IP_EC2
# 3. Porta: 22
# 4. Carregar chave .ppk
# 5. Conectar
```

### **4.2 Instalar Docker na EC2**
```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Adicionar usuário ao grupo docker
sudo usermod -aG docker admin

# Reiniciar sessão SSH
exit
# Reconectar
```

### **4.3 Instalar Docker Compose**
```bash
# Baixar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Dar permissão
sudo chmod +x /usr/local/bin/docker-compose

# Verificar instalação
docker-compose --version
```

### **4.4 Configurar firewall**
```bash
# Permitir portas necessárias
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 5000
sudo ufw allow 8080

# Ativar firewall
sudo ufw enable
```

---

## **🎯 ETAPA 5: DEPLOY NA AWS (20 min)**

### **5.1 Preparar projeto na EC2**
```bash
# Criar diretório
mkdir -p /home/admin/devops-app
cd /home/admin/devops-app

# Baixar arquivos (se repositório público)
git clone https://github.com/isisxavier/2024-devops.git .

# OU copiar arquivos manualmente
```

### **5.2 Executar aplicação**
```bash
# Baixar imagens
docker pull isisxavier/2024-devops:frontend
docker pull isisxavier/2024-devops:backend

# Iniciar aplicação
docker-compose -f docker-compose.prod.yml up -d

# Verificar status
docker-compose ps
```

### **5.3 Testar acesso**
- ✅ Frontend: `http://SEU_IP_EC2`
- ✅ Backend: `http://SEU_IP_EC2:5000`
- ✅ PhpMyAdmin: `http://SEU_IP_EC2:8080`

---

## **🎯 ETAPA 6: CONFIGURAÇÃO DO GITHUB ACTIONS (15 min)**

### **6.1 Configurar secrets no GitHub**
No repositório → Settings → Secrets and variables → Actions:

**DOCKER_USERNAME**: `isisxavier`
**DOCKER_PASSWORD**: `[sua senha do Docker Hub]`
**EC2_HOST**: `SEU_IP_EC2`
**EC2_USERNAME**: `admin`
**EC2_SSH_KEY**: `[conteúdo da chave privada SSH]`

### **6.2 Testar workflow**
```bash
# Fazer alteração no código
echo "# Teste" >> README.md

# Commit e push para master
git add .
git commit -m "test: teste do workflow"
git push origin master
```

### **6.3 Verificar deploy automático**
- ✅ GitHub Actions executando
- ✅ Imagens sendo construídas
- ✅ Deploy na AWS funcionando
- ✅ Aplicação atualizada

---

## **🎯 ETAPA 7: TESTE FINAL (10 min)**

### **7.1 Verificar funcionamento completo**
- ✅ Aplicação rodando localmente
- ✅ Aplicação rodando na AWS
- ✅ Deploy automático funcionando
- ✅ Todas as funcionalidades operacionais

### **7.2 Documentar para o vídeo**
- ✅ Screenshots da aplicação funcionando
- ✅ Comandos executados
- ✅ URLs de acesso
- ✅ Status dos containers

---

## **🎬 ETAPA 8: GRAVAÇÃO DO VÍDEO (20 min)**

### **8.1 Preparar roteiro**
- ✅ Aplicação funcionando localmente
- ✅ Estrutura do projeto explicada
- ✅ Containers Docker rodando
- ✅ Git e branches demonstrados
- ✅ GitHub Actions funcionando
- ✅ Deploy na AWS funcionando
- ✅ Comparação antes/depois

### **8.2 Gravar demonstração**
- ✅ Mostrar cada funcionalidade
- ✅ Explicar cada etapa
- ✅ Demonstrar deploy automático
- ✅ Comparar versões

---

## **🔧 COMANDOS DE EMERGÊNCIA**

### **Se algo der errado localmente:**
```bash
# Parar tudo
docker-compose down

# Limpar containers
docker system prune -a

# Recomeçar
docker-compose up -d
```

### **Se algo der errado na AWS:**
```bash
# Verificar logs
docker-compose logs

# Reiniciar serviços
docker-compose restart

# Reinstalar se necessário
docker-compose down
docker-compose up -d
```

---

## **✅ CHECKLIST FINAL**

- [ ] Aplicação funcionando localmente
- [ ] Git configurado com 3 branches
- [ ] Docker Hub configurado
- [ ] AWS EC2 configurada
- [ ] Aplicação rodando na AWS
- [ ] GitHub Actions funcionando
- [ ] Deploy automático testado
- [ ] Vídeo gravado e editado

---

## **🎯 TEMPO TOTAL ESTIMADO: 3-4 horas**

**DIVIDA EM SESSÕES DE 1 HORA PARA MELHOR PROVEITO!**

**BOA SORTE! 🚀**


