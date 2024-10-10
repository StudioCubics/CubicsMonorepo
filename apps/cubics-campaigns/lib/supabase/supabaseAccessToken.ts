import { auth } from "@/auth";

const supabaseAccessToken = (async () => {
  const session = await auth();
  return session?.supabaseAccessToken;
})();
export default supabaseAccessToken;
