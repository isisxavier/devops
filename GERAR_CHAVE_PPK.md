# 🔑 Como Gerar Chave PPK a partir da Chave PEM

## **📋 PRÉ-REQUISITOS**
- ✅ Conta AWS ativa
- ✅ Instância EC2 criada
- ✅ Chave PEM (.pem) para acessar a instância
- ✅ PuTTYgen instalado (vem com o PuTTY)
- ✅ Acesso à sua instância EC2

---

## **🎯 ETAPA 0: Como Conseguir a Chave PEM da AWS**

### **0.1 Criar nova instância EC2**
1. **Acesse o Console AWS**: https://console.aws.amazon.com/
2. **Vá para EC2** → **Instâncias** → **Executar instâncias**
3. **Configure a instância**:
   - Nome: `devops-instance`
   - AMI: Debian 12 (ou Ubuntu 22.04)
   - Tipo: t2.micro (gratuito)
   - **IMPORTANTE**: Em "Par de chaves", selecione **"Criar novo par de chaves"**

### **0.2 Criar novo par de chaves**
1. **Nome da chave**: Digite um nome (ex: `devops-key`)
2. **Tipo de chave**: RSA
3. **Formato do arquivo**: `.pem`
4. **Clique em "Criar par de chaves"**

### **0.3 Baixar a chave PEM**
- ✅ **A chave será baixada automaticamente** para seu computador
- ✅ **Salve em local seguro** (ex: `C:\Users\SeuUsuario\.ssh\devops-key.pem`)
- ✅ **IMPORTANTE**: Esta é a ÚNICA vez que você verá esta chave!
- ✅ **NUNCA compartilhe** ou perca este arquivo

### **0.4 Se já tem uma instância existente**
- ✅ **Verifique se tem a chave PEM** da instância
- ✅ **Se perdeu a chave**: Você precisará criar uma nova instância
- ✅ **AWS não pode recuperar** chaves perdidas

---

## **🎯 ETAPA 1: Baixar PuTTYgen**

### **1.1 Se não tiver o PuTTY instalado:**
```bash
# Baixar PuTTY (inclui PuTTYgen)
# Link: https://www.putty.org/
# Ou usar o winget (Windows 10/11):
winget install PuTTY.PuTTY
```

### **1.2 Se já tiver o PuTTY:**
- O PuTTYgen já está instalado junto
- Localização típica: `C:\Program Files\PuTTY\puttygen.exe`

---

## **🎯 ETAPA 2: Converter Chave PEM para PPK**

### **2.1 Abrir PuTTYgen**
- Execute o `puttygen.exe`
- Ou procure por "PuTTYgen" no menu iniciar

### **2.2 Carregar chave PEM**
1. Clique em **"Load"**
2. Selecione sua chave `.pem`
3. **IMPORTANTE**: Na caixa de seleção de arquivos, mude para **"All Files (*.*)"**
4. Selecione sua chave PEM

### **2.3 Salvar como PPK**
1. Clique em **"Save private key"**
2. Escolha um nome para o arquivo (ex: `minha-instancia.ppk`)
3. Clique em **"Save"**

---

## **🎯 ETAPA 3: Usar a Chave PPK**

### **3.1 No PuTTY:**
1. Abra o PuTTY
2. Em **"Host Name"**: IP da sua instância EC2
3. Em **"Port"**: 22
4. Em **"Connection type"**: SSH
5. Vá em **"Connection" → "SSH" → "Auth" → "Credentials"**
6. Clique em **"Browse"** e selecione sua chave `.ppk`
7. Clique em **"Open"**

### **3.2 No GitHub Actions:**
- Use a chave PPK no secret `EC2_SSH_KEY`
- Ou converta para formato base64 se necessário

---

## **🎯 ETAPA 4: Testar Conexão**

### **4.1 Conectar via PuTTY:**
```bash
# Usuário padrão para Debian/Ubuntu:
Username: admin
# Ou
Username: ubuntu
# Ou
Username: ec2-user
```

### **4.2 Verificar se conectou:**
```bash
# Deve aparecer algo como:
admin@ip-172-31-xx-xx:~$
```

---

## **⚠️ TROUBLESHOOTING**

### **Problema: "Server refused our key"**
- ✅ Verifique se a chave PPK está correta
- ✅ Confirme o usuário (admin/ubuntu/ec2-user)
- ✅ Verifique se a instância aceita conexões SSH

### **Problema: "Permission denied"**
- ✅ Verifique se o arquivo PPK tem permissões corretas
- ✅ Confirme se a chave pública está na instância
- ✅ Verifique se está usando o usuário correto

### **Problema: "Connection timed out"**
- ✅ Verifique Security Groups da AWS
- ✅ Confirme se a porta 22 está aberta
- ✅ Verifique se a instância está rodando

### **Problema: "Chave PEM não encontrada"**
- ✅ Verifique se baixou a chave ao criar a instância
- ✅ Se perdeu, crie uma nova instância EC2
- ✅ AWS não pode recuperar chaves perdidas

---

## **🔗 Links Úteis**
- [PuTTY Download](https://www.putty.org/)
- [Documentação AWS EC2](https://docs.aws.amazon.com/ec2/)
- [Tutorial PuTTY](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html)
- [Console AWS EC2](https://console.aws.amazon.com/ec2/)

---

## **📋 CHECKLIST COMPLETO**

### **Para conseguir a chave PEM:**
- [ ] Criar instância EC2 na AWS
- [ ] Criar novo par de chaves (.pem)
- [ ] Baixar e salvar a chave PEM
- [ ] Guardar a chave em local seguro

### **Para converter para PPK:**
- [ ] Instalar PuTTY (inclui PuTTYgen)
- [ ] Abrir PuTTYgen
- [ ] Carregar chave PEM
- [ ] Salvar como PPK
- [ ] Testar conexão via PuTTY

**✅ Com a chave PPK, você pode conectar na sua instância EC2!**
