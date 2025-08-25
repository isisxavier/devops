# 🔄 MIGRAÇÃO PARA NOVO REPOSITÓRIO

## **📋 O QUE MUDOU**
- ✅ **Repositório GitHub**: `https://github.com/isisxavier/devops.git`
- ✅ **Docker Hub**: `isisxavier/devops`
- ✅ **Nova instância AWS EC2**

---

## **🎯 ETAPA 1: Atualizar Repositório Local**

### **1.1 Verificar repositório atual**
```bash
# Verificar remote atual
git remote -v

# Deve mostrar algo como:
# origin  https://github.com/isisxavier/2024-devops.git (fetch)
# origin  https://github.com/isisxavier/2024-devops.git (push)
```

### **1.2 Alterar para novo repositório**
```bash
# Remover remote antigo
git remote remove origin

# Adicionar novo remote
git remote add origin https://github.com/isisxavier/devops.git

# Verificar se foi alterado
git remote -v

# Deve mostrar:
# origin  https://github.com/isisxavier/devops.git (fetch)
# origin  https://github.com/isisxavier/devops.git (push)
```

### **1.3 Fazer push para o novo repositório**
```bash
# Fazer push de todas as branches
git push -u origin master
git push -u origin dev
git push -u origin staging

# Se der erro de histórico divergente, force o push:
git push -u origin master --force
git push -u origin dev --force
git push -u origin staging --force
```

---

## **🎯 ETAPA 2: Atualizar Docker Hub**

### **2.1 Fazer login no Docker Hub**
```bash
docker login
# Usuário: isisxavier
# Senha: [sua senha]
```

### **2.2 Construir novas imagens**
```bash
# Construir com novo nome
docker build -t isisxavier/devops:frontend ./frontend
docker build -t isisxavier/devops:backend ./backend
```

### **2.3 Fazer push das novas imagens**
```bash
# Push para o novo repositório
docker push isisxavier/devops:frontend
docker push isisxavier/devops:backend
```

---

## **🎯 ETAPA 3: Configurar Nova Instância AWS**

### **3.1 Gerar chave PPK**
- ✅ Seguir o guia `GERAR_CHAVE_PPK.md`
- ✅ Converter sua chave PEM para PPK
- ✅ Testar conexão via PuTTY

### **3.2 Configurar GitHub Secrets**
No seu repositório `https://github.com/isisxavier/devops.git`:

1. **Vá em Settings → Secrets and variables → Actions**
2. **Configure os seguintes secrets:**
   - `DOCKER_USERNAME`: `isisxavier`
   - `DOCKER_PASSWORD`: `[sua senha do Docker Hub]`
   - `EC2_HOST`: `[IP da sua nova instância]`
   - `EC2_USERNAME`: `admin` (ou o usuário da sua instância)
   - `EC2_SSH_KEY`: `[conteúdo da sua chave PPK]`

### **3.3 Preparar instância AWS**
```bash
# Conectar via PuTTY
# IP: [IP da sua instância]
# Usuário: admin (ou o padrão da sua AMI)

# Instalar Docker
sudo apt update
sudo apt install -y docker.io docker-compose

# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER

# Criar diretório da aplicação
mkdir -p /home/admin/devops-app
cd /home/admin/devops-app
```

---

## **🎯 ETAPA 4: Testar Deploy**

### **4.1 Fazer commit e push**
```bash
# Fazer uma alteração qualquer
echo "# Teste de deploy" >> README.md

# Commit e push
git add .
git commit -m "test: teste de deploy na nova instância"
git push origin master
```

### **4.2 Verificar GitHub Actions**
1. **Vá para a aba Actions no GitHub**
2. **Verifique se o workflow executou**
3. **Confirme se conectou na nova instância**
4. **Verifique se a aplicação subiu**

### **4.3 Testar aplicação**
```bash
# Na sua instância AWS
docker ps

# Deve mostrar os containers rodando:
# - frontend (porta 8081)
# - backend (porta 5000)
# - mysql (porta 3306)
# - phpmyadmin (porta 8080)
```

---

## **⚠️ PROBLEMAS COMUNS**

### **Erro: "Repository not found"**
- ✅ Verificar se o repositório `devops` existe no GitHub
- ✅ Confirmar se você tem acesso de escrita
- ✅ Verificar se o nome está correto

### **Erro: "Authentication failed" no Docker**
- ✅ Fazer login novamente: `docker login`
- ✅ Verificar usuário e senha
- ✅ Verificar se a conta tem permissão de push

### **Erro: "Connection refused" na AWS**
- ✅ Verificar Security Groups (porta 22 deve estar aberta)
- ✅ Confirmar se a instância está rodando
- ✅ Verificar se a chave PPK está correta

---

## **✅ CHECKLIST DE MIGRAÇÃO**

- [ ] Alterar remote do Git para novo repositório
- [ ] Fazer push de todas as branches
- [ ] Construir e fazer push das imagens Docker
- [ ] Gerar chave PPK da nova instância
- [ ] Configurar GitHub Secrets
- [ ] Preparar instância AWS
- [ ] Testar deploy automático
- [ ] Verificar se aplicação está funcionando
- [ ] Testar todas as funcionalidades

---

## **🔗 LINKS IMPORTANTES**

- **Novo Repositório**: https://github.com/isisxavier/devops.git
- **Docker Hub**: https://hub.docker.com/r/isisxavier/devops
- **Guia PPK**: `GERAR_CHAVE_PPK.md`
- **Passo a Passo**: `PASSO_A_PASSO_COMPLETO.md`
