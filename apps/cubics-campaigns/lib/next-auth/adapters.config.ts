import { SupabaseAdapter } from "@auth/supabase-adapter";
import { NextAuthConfig } from "next-auth";

export default {
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
} satisfies Omit<NextAuthConfig, "providers">;
