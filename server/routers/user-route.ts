import { z } from "zod";
import { publicProcedure } from "../trpc";

export function example() {
  return publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return {
        example: "hello",
      };
    });
}
