import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { registerUser } from "./routers/user-route";

export const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = t.router({
  registerUser: registerUser(),
});

export type AppRouter = typeof appRouter;
