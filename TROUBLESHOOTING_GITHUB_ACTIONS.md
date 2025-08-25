# 🔧 TROUBLESHOOTING GITHUB ACTIONS - ERRO SSH

## **🚨 PROBLEMA IDENTIFICADO**
```
ssh.ParsePrivateKey: ssh: no key found
ssh: handshake failed: ssh: unable to authenticate
```

---

## **🎯 SOLUÇÃO 1: Corrigir Chave SSH**

### **1.1 Verificar formato da chave**
No GitHub → Settings → Secrets → Actions:

**✅ CORRETO:**
- `EC2_SSH_KEY`: Conteúdo completo da chave PPK (incluindo cabeçalhos)

**❌ INCORRETO:**
- Apenas parte da chave
- Chave em formato PEM
- Chave em base64 incorreta

### **1.2 Como obter a chave correta**
```bash
# Opção 1: Copiar conteúdo da chave PPK
# Abra sua chave .ppk em um editor de texto
# Copie TODO o conteúdo (incluindo as linhas de início e fim)

# Opção 2: Converter para base64 (alternativa)
# No Windows PowerShell:
[Convert]::ToBase64String([IO.File]::ReadAllBytes("caminho/para/sua/chave.ppk"))
```

### **1.3 Verificar secrets configurados**
```bash
# Secrets obrigatórios:
DOCKER_USERNAME: isisxavier
DOCKER_PASSWORD: [sua senha do Docker Hub]
EC2_HOST: [IP da sua instância EC2]
EC2_USERNAME: admin (ou o usuário da sua instância)
EC2_SSH_KEY: [conteúdo completo da chave PPK]
```

---

## **🎯 SOLUÇÃO 2: Testar Conexão SSH**

### **2.1 Testar via PuTTY primeiro**
```bash
# 1. Conectar via PuTTY com sua chave PPK
# 2. Se conectar, a chave está funcionando
# 3. Se não conectar, problema na chave ou instância
```

### **2.2 Verificar Security Groups AWS**
- ✅ **Porta 22 (SSH)**: Deve estar aberta
- ✅ **Source**: 0.0.0.0/0 (ou IP específico)
- ✅ **Status**: Ativo

### **2.3 Verificar usuário da instância**
```bash
# Para Debian/Ubuntu:
Username: admin
# OU
Username: ubuntu
# OU
Username: ec2-user

# Verificar qual é o correto na sua AMI
```

---

## **🎯 SOLUÇÃO 3: Atualizar Workflow (se necessário)**

### **3.1 Verificar se o workflow está correto**
O arquivo `.github/workflows/deploy.yml` deve estar assim:

```yaml
- name: Deploy to EC2
  uses: appleboy/ssh-action@v0.1.5
  with:
    host: ${{ secrets.EC2_HOST }}
    username: ${{ secrets.EC2_USERNAME }}
    key: ${{ secrets.EC2_SSH_KEY }}
    script: |
      # Parar containers existentes
      docker-compose down || true
      
      # Remover imagens antigas
      docker rmi isisxavier/devops:frontend isisxavier/devops:backend || true
      
      # Baixar novas imagens
      docker pull isisxavier/devops:frontend
      docker pull isisxavier/devops:backend
      
      # Iniciar aplicação
      cd /home/admin/devops-app
      docker-compose up -d
      
      # Verificar status
      docker-compose ps
      echo "Deploy concluído em $(date)"
```

---

## **🎯 SOLUÇÃO 4: Debug Passo a Passo**

### **4.1 Fazer commit de teste**
```bash
# Fazer uma alteração pequena
echo "# Teste SSH $(date)" >> README.md

# Commit e push
git add .
git commit -m "test: teste de conexão SSH"
git push origin master
```

### **4.2 Verificar logs do GitHub Actions**
1. **Vá para aba Actions**
2. **Clique no workflow que falhou**
3. **Clique em "Deploy to EC2"**
4. **Verifique os logs de erro**

### **4.3 Verificar se a instância está acessível**
```bash
# Testar ping
ping [SEU_IP_EC2]

# Testar porta 22
telnet [SEU_IP_EC2] 22
```

---

## **⚠️ PROBLEMAS COMUNS E SOLUÇÕES**

### **Problema: "ssh: no key found"**
- ✅ **Causa**: Chave SSH mal formatada ou incompleta
- ✅ **Solução**: Copiar conteúdo completo da chave PPK
- ✅ **Verificar**: Formato da chave nos secrets

### **Problema: "unable to authenticate"**
- ✅ **Causa**: Chave incorreta ou usuário errado
- ✅ **Solução**: Verificar chave e usuário da instância
- ✅ **Verificar**: Security Groups e status da instância

### **Problema: "connection refused"**
- ✅ **Causa**: Porta 22 fechada ou instância parada
- ✅ **Solução**: Verificar Security Groups e status da instância
- ✅ **Verificar**: Console AWS EC2

---

## **✅ CHECKLIST DE VERIFICAÇÃO**

### **Antes de executar o workflow:**
- [ ] Chave PPK funcionando via PuTTY
- [ ] Instância EC2 rodando
- [ ] Security Groups configurados
- [ ] Todos os secrets configurados no GitHub
- [ ] Workflow atualizado com novo repositório Docker

### **Durante execução:**
- [ ] Workflow inicia sem erros
- [ ] Build das imagens Docker funciona
- [ ] Push para Docker Hub funciona
- [ ] Conexão SSH estabelecida
- [ ] Deploy na EC2 concluído

---

## **🔗 LINKS ÚTEIS**

- **GitHub Secrets**: Settings → Secrets and variables → Actions
- **AWS Console**: https://console.aws.amazon.com/ec2/
- **PuTTY Download**: https://www.putty.org/
- **Documentação SSH Action**: https://github.com/appleboy/ssh-action

---

## **📞 SE NADA FUNCIONAR**

1. ✅ **Verificar se a instância está rodando** na AWS
2. ✅ **Testar conexão manual** via PuTTY
3. ✅ **Verificar formato da chave** nos secrets
4. ✅ **Confirmar usuário correto** da instância
5. ✅ **Verificar Security Groups** da AWS

**Com essas verificações, o SSH deve funcionar! 🚀**
