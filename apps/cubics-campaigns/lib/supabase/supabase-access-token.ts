import { auth } from "@/auth";

const supabaseAccessToken = await (async () => {
  const session = await auth();
  return session?.supabaseAccessToken;
})();
export default supabaseAccessToken;
