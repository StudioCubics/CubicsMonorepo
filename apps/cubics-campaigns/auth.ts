import { SignJWT } from "jose";
import NextAuth from "next-auth";
import { encode } from "next-auth/jwt";
import { v4 } from "uuid";
import adapterConfig, { supabaseAdapter } from "./lib/authjs/adapters.config";
import providersConfig from "./lib/authjs/providers.config";
import jwtConfig from "./lib/authjs/jwt.config";
import callbacksConfig from "./lib/authjs/callbacks.config";

const config = NextAuth({
  // debug: true,
  // Google and Credentials providers used
  ...providersConfig,

  // Supabase adapter used
  ...adapterConfig,

  // Callbacks handling both session(for Google Provider) and jwt(ti)
  ...callbacksConfig,

  // This is required because credentials provider was used, to attach the adapter.
  ...jwtConfig,

  pages: { signIn: "/auth/login" },
});
export const { handlers, signIn, signOut, auth } = config;
