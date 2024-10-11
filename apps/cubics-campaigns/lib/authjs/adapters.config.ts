import { SupabaseAdapter } from "@auth/supabase-adapter";
import { NextAuthConfig } from "next-auth";

export const supabaseAdapter = SupabaseAdapter({
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  secret: process.env.SUPABASE_SECRET_KEY!,
});

export default {
  adapter: supabaseAdapter,
} satisfies Omit<NextAuthConfig, "providers">;
