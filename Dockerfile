# syntax=docker/dockerfile:1.6
FROM oven/bun:latest as base
WORKDIR /app

FROM base as deps
COPY package.json tsconfig.json bun.lockb* ./
RUN bun install --frozen-lockfile || bun install

FROM base as runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules /app/node_modules
COPY . .
CMD ["bun", "run", "src/index.ts"]
