# --- Этап 1: сборка проекта ---
FROM node:20-alpine AS builder
RUN apk add --no-cache ca-certificates
WORKDIR /app

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

USER node

ENV NODE_ENV=productionx`
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "start"]