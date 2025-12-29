import { Bot, InlineKeyboard } from "grammy";
import { env, logger } from "@aissist/core";

export const createTelegramBot = () => {
  const bot = new Bot(env.TELEGRAM_BOT_TOKEN);

  bot.command("start", async (ctx) => {
    const connectUrl = env.PUBLIC_BASE_URL
      ? `${env.PUBLIC_BASE_URL}/oauth/start?user=${ctx.from?.id}`
      : undefined;

    const keyboard = new InlineKeyboard();
    if (connectUrl) {
      keyboard.url("Connect Google", connectUrl);
    }

    await ctx.reply(
      "Hi! I'm your personal AI assistant. Send me a message or voice note to get started.",
      keyboard.inline_keyboard.length ? { reply_markup: keyboard } : undefined,
    );
  });

  bot.on("message:text", async (ctx) => {
    await ctx.reply(`You said: ${ctx.message.text}`);
  });

  bot.on("message:voice", async (ctx) => {
    await ctx.reply("Voice messages will be transcribed soon. For now, I received your audio.");
  });

  bot.catch((error) => {
    logger.error({ err: error.error }, "Telegram bot error");
  });

  return bot;
};
