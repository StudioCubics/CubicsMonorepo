import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    emailVerified: Date | null;
  }
  interface Session extends DefaultSession {
    // A JWT which can be used as Authorization header with supabase-js for RLS.
    supabaseAccessToken?: string;
    user: {
      verified?: boolean;
      // extend user
    } & DefaultSession["user"];
  }
}
