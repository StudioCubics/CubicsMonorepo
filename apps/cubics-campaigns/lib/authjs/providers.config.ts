import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import prisma from "@/prisma/client";
import { compare } from "bcryptjs";

export type CredentialsFormData = {
  email: string;
  password: string;
};

export default {
  providers: [
    Google,
    Credentials({
      credentials: {
        password: {},
        email: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as CredentialsFormData;

        const user = await prisma.next_auth_users.findUnique({
          where: { email },
        });
        console.log("user while login", user);
        if (!user) throw new Error("Email address or password is incorrect!");

        const account = await prisma.accounts.findFirst({
          where: {
            userId: user.id,
          },
        });
        if (!account)
          throw new Error("Email address or password is incorrect!");

        const credKeys = account.credential_keys;

        const checkPass = await compare(
          password,
          credKeys[credKeys.length - 1]
        );
        if (!checkPass)
          throw new Error("Email address or password is incorrect!");
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
