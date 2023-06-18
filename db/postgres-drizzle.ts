import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { env } from "@/env.mjs";

const connectionString = `postgresql://postgres:${env.SUPABASE_DB_PASSWORD}@db.uovnafaejedoxnlybcnz.supabase.co:5432/postgres`;

const client = postgres(connectionString);
export const db = drizzle(client);
