FROM node:18-alpine

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install --only=production

# Copiar código fonte
COPY . .

# Expor porta
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["npm", "start"]


