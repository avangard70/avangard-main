# --- Этап 1: сборка проекта ---
FROM node:20-alpine AS builder
RUN apk add --no-cache ca-certificates
WORKDIR /app

# Рабочая директория
WORKDIR /app

# Копируем package.json и lock-файлы
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем весь проект
COPY . .

ENV NEXT_PUBLIC_DOMAIN=https://avangard-70-server.ru
ENV NEXT_PUBLIC_MAIN_DOMAIN=https://avangard-70.ru

# Сборка проекта (Next.js)
RUN npm run build

# --- Этап 2: запуск продакшен-сервера ---
FROM node:20-alpine AS runner

WORKDIR /app

# Устанавливаем только production-зависимости
COPY package*.json ./
RUN npm ci --only=production

# Копируем собранные артефакты
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Безопасный пользователь
USER node

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "start"]
