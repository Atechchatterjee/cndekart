import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { example } from "./routers/user-route";

export const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = t.router({
  getUsers: example(),
});

export type AppRouter = typeof appRouter;
