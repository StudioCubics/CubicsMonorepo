import type { NextAuthConfig } from "next-auth";
import { SignJWT } from "jose";

export default {
  callbacks: {
    jwt({ token, user, account }) {
      // jwt is required as credentials provider supports only jwt
      // returned token is received by jwt's encode in jwt.config.ts
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      console.log("user", user);
      token.emailVerified = user.emailVerified; // Add emailVerified to the token
      return token;
    },

    async session({ session, user }) {
      // This will be used by other providers directly no need to deal with jwt.
      console.log("user in session", user);

      //   if (user?.emailVerified)
      session.user.verified = Boolean(user.emailVerified);

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
} satisfies Pick<NextAuthConfig, "callbacks">;
