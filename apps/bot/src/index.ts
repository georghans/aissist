import { Elysia } from "elysia";
import { createTelegramBot } from "./telegram";
import { env, logger } from "@aissist/core";

const bot = createTelegramBot();

const app = new Elysia()
  .get("/health", () => ({ status: "ok" }))
  .post("/webhook/telegram", async ({ body, set }) => {
    try {
      await bot.handleUpdate(body);
      return { ok: true };
    } catch (err) {
      set.status = 500;
      logger.error({ err }, "Failed to handle telegram update");
      return { ok: false };
    }
  })
  .listen(env.PORT);

logger.info(`Bot server running on port ${env.PORT}`);

export type App = typeof app;
