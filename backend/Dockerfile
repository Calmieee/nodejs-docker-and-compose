FROM node:16-alpine AS builder
WORKDIR /app   
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . ./
RUN npm run build 
RUN ls -la /app/dist  # Проверка содержимого после сборки

FROM node:16-alpine AS backend
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund \
    && npm i -g pm2 \
    && apk add --no-cache netcat-openbsd  # Устанавливаем утилиту netcat

COPY --from=builder /app/dist ./dist
COPY ./ecosystem.config.js ./

# Ожидание, пока PostgreSQL станет доступен
# RUN while ! nc -z database 5432; do sleep 1; done && echo "PostgreSQL is up and running"

ENTRYPOINT ["pm2-runtime", "start", "ecosystem.config.js"]