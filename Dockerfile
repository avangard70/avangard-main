# --- Этап 1: сборка проекта ---
FROM node:20-alpine AS builder
RUN apk add --no-cache ca-certificates
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
ENV NEXT_PUBLIC_DOMAIN=https://avangard-70-server.ru  
ENV NEXT_PUBLIC_MAIN_DOMAIN=https://avangard-70.ru  
RUN npm run build

# --- Этап 2: запуск продакшен-сервера ---
FROM node:20-alpine AS runner

WORKDIR /app

# Устанавливаем production-зависимости ОТ ROOT
COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Устанавливаем busybox-extras для mount
RUN apk add --no-cache busybox-extras

# Создаём entrypoint.sh — он будет запущен от root
RUN echo '#!/bin/sh\n\
set -e\n\
# Делаем корень read-only\n\
mount -o remount,ro / || echo "Warning: cannot remount / as read-only"\n\
# Монтируем tmpfs\n\
mount -t tmpfs -o rw,noexec,nosuid,size=50m tmpfs /tmp\n\
mount -t tmpfs -o rw,noexec,nosuid,size=30m tmpfs /var/tmp\n\
# Переключаемся на пользователя node и запускаем приложение\n\
exec su-exec node npm run start\n\
' > /entrypoint.sh && chmod +x /entrypoint.sh

# Важно: НЕ меняем пользователя заранее!
# USER node — НЕ указываем здесь

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["/entrypoint.sh"]