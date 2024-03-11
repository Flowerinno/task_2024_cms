import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { User } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      id: string;
      role: "ADMIN" | "USER";
    };
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        const u = user as User;
        return {
          ...token,
          id: u.id,
          role: u.role,
        };
      }
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      };
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials): Promise<any> {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (user?.is_blocked) {
          throw new Error("User is blocked");
        }

        if (user?.is_deleted) {
          throw new Error("User is deleted");
        }

        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }

        return user as any;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
