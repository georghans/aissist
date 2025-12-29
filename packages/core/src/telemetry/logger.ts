import pino from "pino";

export const createLogger = (correlationId?: string) =>
  pino({
    name: "aissist",
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    base: correlationId ? { correlationId } : undefined,
  });

export const logger = createLogger();
