# 🔍 VERIFICAR DEPENDÊNCIAS NECESSÁRIAS

## **📋 DEPENDÊNCIAS OBRIGATÓRIAS**

### **1. Docker Desktop**
```bash
# Verificar se está instalado
docker --version
docker-compose --version

# Se não estiver instalado:
# Windows: https://www.docker.com/products/docker-desktop/
# Baixe e instale o Docker Desktop para Windows
```

### **2. Git**
```bash
# Verificar se está instalado
git --version

# Se não estiver instalado:
# Windows: https://git-scm.com/download/win
# Baixe e instale o Git para Windows
```

### **3. Node.js (opcional, para desenvolvimento)**
```bash
# Verificar se está instalado
node --version
npm --version

# Se não estiver instalado:
# Windows: https://nodejs.org/
# Baixe e instale a versão LTS
```

### **4. PuTTY (para conectar na AWS)**
```bash
# Verificar se está instalado
# Se não estiver instalado:
# Windows: https://www.putty.org/
# Baixe e instale o PuTTY
```

---

## **🔧 INSTALAÇÃO DO DOCKER (PASSO A PASSO)**

### **1. Baixar Docker Desktop**
- Acesse: https://www.docker.com/products/docker-desktop/
- Clique em "Download for Windows"
- Baixe o instalador

### **2. Instalar Docker Desktop**
- Execute o instalador baixado
- Siga as instruções do assistente
- **IMPORTANTE**: Marque a opção "Use WSL 2 instead of Hyper-V"
- Reinicie o computador se solicitado

### **3. Verificar instalação**
```bash
# Abrir PowerShell ou CMD
docker --version
docker-compose --version

# Deve mostrar as versões instaladas
```

### **4. Primeira execução**
- Abra o Docker Desktop
- Aguarde inicialização (ícone verde na bandeja)
- Aceite os termos de uso

---

## **🔧 INSTALAÇÃO DO GIT (PASSO A PASSO)**

### **1. Baixar Git**
- Acesse: https://git-scm.com/download/win
- Baixe a versão para Windows

### **2. Instalar Git**
- Execute o instalador
- Use as configurações padrão
- **IMPORTANTE**: Escolha "Git from the command line and also from 3rd-party software"

### **3. Verificar instalação**
```bash
# Abrir PowerShell ou CMD
git --version

# Deve mostrar a versão instalada
```

### **4. Configurar usuário**
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@exemplo.com"
```

---

## **🔧 INSTALAÇÃO DO NODE.JS (OPCIONAL)**

### **1. Baixar Node.js**
- Acesse: https://nodejs.org/
- Baixe a versão LTS (recomendada)

### **2. Instalar Node.js**
- Execute o instalador
- Use as configurações padrão
- Reinicie o computador se solicitado

### **3. Verificar instalação**
```bash
# Abrir PowerShell ou CMD
node --version
npm --version

# Deve mostrar as versões instaladas
```

---

## **🔧 INSTALAÇÃO DO PUTTY (PARA AWS)**

### **1. Baixar PuTTY**
- Acesse: https://www.putty.org/
- Baixe o "putty.exe" (64-bit)

### **2. Instalar PuTTY**
- Execute o arquivo baixado
- Siga as instruções do assistente

### **3. Baixar PuTTYgen**
- No mesmo site, baixe o "puttygen.exe"
- Este é para converter chaves PEM para PPK

---

## **✅ VERIFICAÇÃO FINAL**

### **Teste todas as dependências:**
```bash
# Abrir PowerShell ou CMD e executar:

# Docker
docker --version
docker-compose --version

# Git
git --version

# Node.js (se instalou)
node --version
npm --version
```

### **Verificar Docker funcionando:**
```bash
# Testar Docker
docker run hello-world

# Deve mostrar uma mensagem de boas-vindas
```

---

## **⚠️ PROBLEMAS COMUNS**

### **1. Docker não inicia**
- Verificar se WSL 2 está habilitado
- Verificar se a virtualização está habilitada na BIOS
- Reiniciar o computador

### **2. Git não reconhecido**
- Verificar se foi adicionado ao PATH
- Reiniciar o terminal/PowerShell
- Reiniciar o computador

### **3. Node.js não reconhecido**
- Verificar se foi adicionado ao PATH
- Reiniciar o terminal/PowerShell
- Reiniciar o computador

---

## **🎯 PRÓXIMOS PASSOS**

Após verificar todas as dependências:

1. **Testar Docker**: `docker run hello-world`
2. **Configurar Git**: Configurar usuário e email
3. **Testar projeto**: Executar `docker-compose up -d`
4. **Verificar aplicação**: Acessar http://localhost:3000

**TODAS AS DEPENDÊNCIAS ESTÃO PRONTAS! 🚀**


