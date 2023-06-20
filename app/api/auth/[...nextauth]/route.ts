import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { PrismaClient, User } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email && !credentials?.password) return null;

        const userEmail: string = credentials?.email || "";
        const userPassword: string = credentials?.password || "";

        const user = await prisma.user.findUnique({
          where: { email: userEmail },
        });

        if (!user) {
          // throw new Error("User does not exists");
          return null;
        }
        if (!user.password) return null;

        const dbPassword: string = user.password;
        if (await bcrypt.compare(userPassword, dbPassword)) return user;
        else {
          return null;
        }
      },
    }),
  ],
  secret: "mysecret",
  callbacks: {
    session: ({ session, token }) => {
      console.log("session function: ", { session, token });
      return session;
    },
    jwt: ({ token, user }) => {
      console.log("jwt function: ", { user });
      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
