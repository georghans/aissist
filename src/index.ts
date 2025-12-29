import { Elysia } from "elysia";
import { createTelegramBot } from "./telegram";
import { env, logger } from "./core";

const bot = createTelegramBot();

// Start long polling instead of webhook delivery for simplicity.
bot.start({ drop_pending_updates: true }).catch((err) => {
  logger.error({ err }, "Failed to start Telegram polling");
  process.exit(1);
});

const app = new Elysia().get("/health", () => ({ status: "ok" })).listen(env.PORT);

logger.info(`Health server running on port ${env.PORT}`);

export type App = typeof app;
