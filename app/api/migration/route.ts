import { db } from "@/db/postgres-drizzle";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { NextResponse } from "next/server";

export async function GET() {
  (async () => {
    migrate(db, { migrationsFolder: "../drizzle" });
    return NextResponse.json({ connected: "success" });
  })();
  return NextResponse.json({ connected: "failed" });
}
