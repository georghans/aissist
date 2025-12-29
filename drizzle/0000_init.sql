CREATE TYPE "provider" AS ENUM ('google');

CREATE TABLE IF NOT EXISTS "users" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "telegram_id" text NOT NULL UNIQUE,
    "timezone" text NOT NULL DEFAULT 'Europe/Berlin',
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS "encrypted_tokens" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "provider" provider NOT NULL,
    "token" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "audit_log" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "action" text NOT NULL,
    "metadata" jsonb,
    "created_at" timestamptz NOT NULL DEFAULT now()
);
