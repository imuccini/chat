RUPULISTURA:

# 1. Ferma tutti i container in esecuzione
docker stop $(docker ps -aq)

# 2. Rimuovi tutti i container (libera risorse)
docker rm $(docker ps -aq)

# 3. (Opzionale, ma utile) Rimuovi immagini "pendenti" inutilizzate per liberare disco
docker image prune -f


----

BUILD:

cd /app
git pull origin main

# Ricostruisci rapidamente (solo package.json è cambiato)
docker-compose -f docker-compose.prod.yml up -d --build



docker-compose -f docker-compose.prod.yml exec app npx prisma db seed


LOG
docker logs chat_app