import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { createClient } from "../supabase/server";

export default {
  providers: [
    Google,
    // Credentials({
    //   credentials: {
    //     name: {},
    //     email: {},
    //     password: {},
    //   },
    //   authorize: async (credentials) => {
    //     const { email, password } = credentials;
    //     const supabase = createClient();
    //     // const user = await prisma.users.findUnique({ where: { email } });
    //     // console.log("user while login", user);
    //     // if (!user) throw new Error("Email address or password is incorrect!");

    //     // const checkPass = await compare(password, user.password);
    //     // if (!checkPass)
    //     //   throw new Error("Email address or password is incorrect!");

    //     // const { password: _, ...userWOPass } = user;
    //     // return {
    //     //   ...userWOPass,
    //     //   id: user.id.toString(),
    //     //   jobJoinedAt: user.jobJoinedAt?.toLocaleString(),
    //     //   createdAt: user.createdAt.toLocaleString(),
    //     // };
    //     return;
    //   },
    // }),
  ],
} satisfies NextAuthConfig;
