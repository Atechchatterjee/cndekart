import { pgTable, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  phone: varchar("phone", { length: 12 }),
  password: text("password"),
  gst: varchar("gst", { length: 15 }),
  pan: varchar("pan", { length: 10 }),
  address: text("address"),
});
