import type {
  Awaitable,
  DefaultSession,
  NextAuthOptions,
  Session,
} from "next-auth";
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
        type: { label: "type", type: "text" },
      },
      async authorize(credentials) {
        console.log("authorizing...");
        if (!credentials?.email && !credentials?.password) {
          throw new Error("Empty Credentials");
        }

        const userEmail: string = credentials?.email || "";
        const userPassword: string = credentials?.password || "";
        console.log({ userEmail, userPassword });

        try {
          const user = await prisma.user.findUnique({
            where: { email: userEmail },
          });
          if (!user) {
            throw new Error("Invalid Email");
          }
          if (!user.password) {
            throw new Error("Invalid Password");
          }
          console.log(user);

          const dbPassword: string = user.password;
          if (await bcrypt.compare(userPassword, dbPassword)) {
            if (credentials.type === "ADMIN") {
              if (user.role === "ADMIN") return user;
              else throw new Error("Not an admin user");
            }
            return user;
          } else {
            throw new Error("Invalid Password");
          }
        } catch (err) {
          throw err;
        }
      },
    }),
  ],
  secret: "mysecret",
  callbacks: {
    session: ({ session, token }) => {
      console.log("session function: ", { session, token });
      return {
        ...session,
        user: { ...session.user, role: token.role },
      };
    },
    jwt: ({ token, user }) => {
      console.log("jwt function: ", { user });
      if (user) token.role = (user as User).role;
      return token;
    },
  },
  pages: {
    signIn: "/login",
    // error: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
