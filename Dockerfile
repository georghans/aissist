# syntax=docker/dockerfile:1.6
FROM oven/bun:latest as base
WORKDIR /app

FROM base as deps
COPY package.json tsconfig.json bun.lockb* ./
COPY packages/core/package.json packages/core/
COPY apps/bot/package.json apps/bot/
RUN bun install --frozen-lockfile || bun install

FROM base as build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY . .
RUN bun run --filter @aissist/bot build

FROM base as runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/apps/bot/dist /app/apps/bot/dist
COPY --from=build /app/apps/bot/package.json /app/apps/bot/
CMD ["bun", "run", "apps/bot/dist/index.js"]
