# Builder stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY . .

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S hello -u 1001

COPY --from=builder --chown=hello:nodejs /app /app

USER hello
EXPOSE 3000

CMD ["node", "src/index.js"]