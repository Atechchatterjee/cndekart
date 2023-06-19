import { publicProcedure } from "../trpc";
import { users } from "@/db/schema/auth";
import { createInsertSchema } from "drizzle-zod";
import { db } from "@/db/postgres-drizzle";
import { eq } from "drizzle-orm";

const apiUser = createInsertSchema(users);

export function createUser() {
  return publicProcedure.input(apiUser).mutation(async ({ input }) => {
    const res = await db
      .select()
      .from(users)
      .where(eq(users.email ?? "", input.email ?? ""));
    console.log(res);
    if (res.length === 0) {
      console.log("creating new user");
      await db.insert(users).values(input);
    } else {
      console.log("user already exists");
    }
  });
}
