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

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Устанавливаем необходимые утилиты
RUN apk add --no-cache busybox-extras su-exec

# Надёжное создание entrypoint.sh
RUN cat > /entrypoint.sh <<'EOF'
#!/bin/sh
set -e
mount -o remount,ro / || echo "Warning: cannot remount / as read-only"
mount -t tmpfs -o rw,noexec,nosuid,size=50m tmpfs /tmp
mount -t tmpfs -o rw,noexec,nosuid,size=30m tmpfs /var/tmp
exec su-exec node npm run start
EOF

RUN chmod +x /entrypoint.sh

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["/entrypoint.sh"]