import { publicProcedure } from "../trpc";
import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as z from "zod";

export function registerUser() {
  return publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        phone: z.string(),
        gst: z.string().optional(),
        pan: z.string().optional(),
        address: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const prisma = new PrismaClient();
      // check if the user already exists
      const res = await prisma.user.findUnique({
        where: { email: input.email },
      });
      if (!res) {
        console.log("Creating a new user");
        const hashedPassword = await bcrypt.hash(input.password, 5);
        input = { ...input, password: hashedPassword };
        await prisma.user.create({
          data: input,
        });
      } else {
        console.log("User already exists");
      }
      return {
        example: "hello",
      };
    });
}
