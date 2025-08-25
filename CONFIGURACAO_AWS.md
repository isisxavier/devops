# ☁️ CONFIGURAÇÃO DA AWS EC2

## **📋 PRÉ-REQUISITOS**
- Conta AWS ativa
- Chave PEM (.pem) para acessar a instância
- Chave PPK (.ppk) para usar com PuTTY
- Instância EC2 Debian rodando

---

## **🔑 CONVERTENDO CHAVE PEM PARA PPK (PuTTY)**

### **1. Abrir PuTTYgen**
- Baixe e instale o PuTTY: https://www.putty.org/
- Abra o PuTTYgen

### **2. Carregar chave PEM**
- Clique em "Load"
- Selecione sua chave `.pem`
- Se der erro, selecione "All Files (*.*)" no filtro

### **3. Salvar como PPK**
- Clique em "Save private key"
- Salve como `chave.ppk`
- **IMPORTANTE**: Guarde esta chave com segurança!

---

## **🖥️ CONECTANDO NA INSTÂNCIA EC2**

### **Opção 1: PuTTY (Recomendado para Windows)**
1. Abra o PuTTY
2. Em "Host Name": `admin@SEU_IP_EC2`
3. Porta: `22`
4. Em "Connection type": `SSH`
5. Vá em "Connection" → "SSH" → "Auth" → "Credentials"
6. Clique em "Browse" e selecione sua chave `.ppk`
7. Clique em "Open"
8. Aceite o aviso de segurança (primeira conexão)

### **Opção 2: PowerShell (se tiver OpenSSH)**
```powershell
ssh -i "caminho/para/chave.pem" admin@SEU_IP_EC2
```

---

## **⚙️ CONFIGURANDO A INSTÂNCIA EC2**

### **1. Atualizar sistema**
```bash
sudo apt update && sudo apt upgrade -y
```

### **2. Instalar Docker**
```bash
# Instalar dependências
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

# Adicionar chave GPG oficial do Docker
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Adicionar repositório do Docker
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Adicionar usuário ao grupo docker
sudo usermod -aG docker admin

# Iniciar e habilitar Docker
sudo systemctl start docker
sudo systemctl enable docker

# Verificar instalação
docker --version
```

### **3. Instalar Docker Compose**
```bash
# Baixar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Dar permissão de execução
sudo chmod +x /usr/local/bin/docker-compose

# Verificar instalação
docker-compose --version
```

### **4. Configurar firewall**
```bash
# Permitir SSH (porta 22)
sudo ufw allow 22

# Permitir HTTP (porta 80)
sudo ufw allow 80

# Permitir HTTPS (porta 443)
sudo ufw allow 443

# Permitir porta do backend (5000)
sudo ufw allow 5000

# Permitir porta do PhpMyAdmin (8080)
sudo ufw allow 8080

# Ativar firewall
sudo ufw enable

# Verificar status
sudo ufw status
```

---

## **📁 PREPARANDO O PROJETO NA EC2**

### **1. Criar diretório do projeto**
```bash
mkdir -p /home/admin/devops-app
cd /home/admin/devops-app
```

### **2. Baixar arquivos do projeto**
```bash
# Clonar repositório (se for público)
git clone https://github.com/isisxavier/devops.git .

# OU baixar arquivos manualmente via SCP
```

### **3. Configurar docker-compose para produção**
```bash
# Usar o arquivo de produção
cp docker-compose.prod.yml docker-compose.yml
```

---

## **🚀 EXECUTANDO A APLICAÇÃO**

### **1. Primeira execução**
```bash
# Baixar imagens do Docker Hub
docker pull isisxavier/devops:frontend
docker pull isisxavier/devops:backend

# Iniciar aplicação
docker-compose up -d

# Verificar status
docker-compose ps
```

### **2. Verificar logs**
```bash
# Logs de todos os serviços
docker-compose logs

# Logs de um serviço específico
docker-compose logs backend
docker-compose logs frontend
```

### **3. Acessar aplicação**
- **Frontend**: `http://SEU_IP_EC2`
- **Backend**: `http://SEU_IP_EC2:5000`
- **PhpMyAdmin**: `http://SEU_IP_EC2:8080`

---

## **🔧 COMANDOS ÚTEIS**

### **Gerenciar containers**
```bash
# Parar aplicação
docker-compose down

# Reiniciar aplicação
docker-compose restart

# Ver logs em tempo real
docker-compose logs -f

# Ver uso de recursos
docker stats
```

### **Manutenção**
```bash
# Atualizar imagens
docker-compose pull
docker-compose up -d

# Limpar imagens não utilizadas
docker image prune -a

# Limpar containers parados
docker container prune
```

---

## **⚠️ PROBLEMAS COMUNS**

### **1. Erro de permissão na chave**
- Verificar se a chave tem permissão 400: `chmod 400 chave.pem`
- Verificar se o usuário é `admin` (não `ubuntu`)

### **2. Docker não inicia**
```bash
sudo systemctl status docker
sudo systemctl restart docker
```

### **3. Portas não acessíveis**
```bash
sudo ufw status
sudo ufw allow 80
```

### **4. Containers não iniciam**
```bash
docker-compose logs
docker-compose down
docker-compose up -d
```

---

## **✅ VERIFICAÇÃO FINAL**

- [ ] Conectou na EC2 via SSH
- [ ] Docker instalado e funcionando
- [ ] Docker Compose instalado
- [ ] Firewall configurado
- [ ] Aplicação rodando
- [ ] Acessível via IP público
- [ ] Todos os serviços funcionando

---

## **🎯 PRÓXIMOS PASSOS**

1. **Configurar GitHub Actions** com secrets da AWS
2. **Testar deploy automático**
3. **Configurar domínio** (opcional)
4. **Monitoramento** e logs
5. **Backup** do banco de dados

**SUA INSTÂNCIA EC2 ESTÁ PRONTA! 🚀**


