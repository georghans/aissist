import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "../config/env";
import * as schema from "./schema";

export const connection = postgres(env.DATABASE_URL, { prepare: false });
export const db = drizzle(connection, { schema });
