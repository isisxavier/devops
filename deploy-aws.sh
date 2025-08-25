#!/bin/bash

echo "🚀 Iniciando deploy na AWS..."

# Verificar se o Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Inicie o Docker primeiro."
    exit 1
fi

# Fazer login no Docker Hub
echo "🔐 Fazendo login no Docker Hub..."
docker login

# Construir imagens
echo "🏗️ Construindo imagens Docker..."
docker build -t isisxavier/devops:frontend ./frontend
docker build -t isisxavier/devops:backend ./backend

# Fazer push para o Docker Hub
echo "📤 Fazendo push para o Docker Hub..."
docker push isisxavier/devops:frontend
docker push isisxavier/devops:backend

echo "✅ Deploy concluído!"
echo "📋 Próximos passos:"
echo "1. Acesse sua instância EC2 na AWS"
echo "2. Execute: docker-compose -f docker-compose.prod.yml up -d"
echo "3. A aplicação estará disponível na porta 80"


