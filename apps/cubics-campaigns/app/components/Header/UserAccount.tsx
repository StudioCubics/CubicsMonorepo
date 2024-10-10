import { auth, signOut } from "@/auth";
import { revalidatePath } from "next/cache";

export default async function UserAccount() {
  const session = await auth();
  if (!session?.user) {
    return <div>Not Logged In</div>;
  }
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <p>{session.user.email}</p>
      <button type="submit">Logout</button>
    </form>
  );
}
