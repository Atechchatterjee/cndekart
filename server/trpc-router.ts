import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { createUser } from "./routers/user-route";

export const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = t.router({
  createUser: createUser(),
});

export type AppRouter = typeof appRouter;
