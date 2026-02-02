# Stage 1: Dependencies
FROM oven/bun:1 AS deps
WORKDIR /app

# Install CA certificates (fix SSL verification for external APIs)
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Stage 2: Development (with Turbopack hot reload)
FROM deps AS dev
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["bun", "run", "dev"]

# Stage 3: Build
FROM deps AS builder
WORKDIR /app
COPY . .
RUN bun run build

# Stage 4: Production (standalone)
FROM oven/bun:1-slim AS prod
WORKDIR /app

# Install CA certificates (fix SSL verification for external APIs)
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["bun", "run", "server.js"]
