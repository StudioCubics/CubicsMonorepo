import { NextAuthConfig } from "next-auth";
import { encode } from "next-auth/jwt";
import { supabaseAdapter } from "./adapters.config";
import { v4 } from "uuid";

export default {
  jwt: {
    encode: async function (params) {
      // params comes from callbacks jwt() in callbacks.config.ts
      console.log("token in encode/JWT", params.token);
      if (params.token?.credentials) {
        const sessionToken = v4();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await supabaseAdapter.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return encode(params);
    },
  },
} satisfies Pick<NextAuthConfig, "jwt">;
