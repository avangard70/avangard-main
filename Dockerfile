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

# Устанавливаем только production-зависимости
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Копируем артефакты
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Создаём минимальные tmp-директории с правами, но БЕЗ возможности записи в корень
RUN mkdir -p /tmp /var/tmp && \
    chmod 1777 /tmp /var/tmp

# Делаем ВСЮ файловую систему недоступной для записи — кроме /tmp и /var/tmp
# Но так как мы не можем использовать --read-only, делаем хитрость:
# перемонтируем корень как read-only через init-скрипт
RUN apk add --no-cache busybox-extras

# Создаём безопасный стартовый скрипт
RUN echo '#!/bin/sh\n\
# Перемонтируем корневую ФС как read-only\n\
mount -o remount,ro / || echo "Не удалось сделать / read-only"\n\
# Пересоздаём /tmp и /var/tmp как tmpfs (в памяти, noexec)\n\
mount -t tmpfs -o rw,noexec,nosuid,size=50m tmpfs /tmp || echo "Не удалось смонтировать /tmp"\n\
mount -t tmpfs -o rw,noexec,nosuid,size=30m tmpfs /var/tmp || echo "Не удалось смонтировать /var/tmp"\n\
# Запускаем приложение\n\
exec npm run start\n\
' > /entrypoint.sh && chmod +x /entrypoint.sh

# Безопасный пользователь
USER node

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["/entrypoint.sh"]