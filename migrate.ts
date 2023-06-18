import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as dotenv from "dotenv";

async function runMigrations() {
  dotenv.config({ debug: true, path: "./.env.local" });
  console.log(process.env.NEXT_PUBLIC_SUPABASE_DB_PASSWORD);
  const connectionString = `postgresql://postgres:${process.env.NEXT_PUBLIC_SUPABASE_DB_PASSWORD}@db.uovnafaejedoxnlybcnz.supabase.co:5432/postgres`;

  const client = postgres(connectionString, { ssl: "require" });
  const db = drizzle(client);

  console.log("migrating...");
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("migraiton successfull");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit();
  }
}

runMigrations();
