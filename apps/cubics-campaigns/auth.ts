import { SignJWT } from "jose";
import NextAuth from "next-auth";
import adapterConfig from "./lib/authjs/adapters.config";
import providersConfig from "./lib/authjs/providers.config";



const config = NextAuth({
  debug: true,
  ...providersConfig,
  ...adapterConfig,
  callbacks: {
    async session({ session, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET;
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        };
        const iat = Math.floor(Date.now() / 1000);
        const exp = iat + 60 * 60; // one hour

        session.supabaseAccessToken = await new SignJWT({ ...payload })
          .setProtectedHeader({ alg: "HS256", typ: "JWT" })
          .setExpirationTime(exp)
          .setIssuedAt(iat)
          .setNotBefore(iat)
          .sign(new TextEncoder().encode(signingSecret));
      }
      return session;
    },
  },
  pages: { signIn: "/auth/login" },
});
export const { handlers, signIn, signOut, auth } = config;
