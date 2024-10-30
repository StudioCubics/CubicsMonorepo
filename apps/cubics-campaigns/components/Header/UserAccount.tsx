import { signOut } from "@/auth";
import { Button } from "@studiocubics/core";

export default async function UserAccount() {
  // const session = await auth();
  // if (!session?.user) {
  //   return <div>Not Logged In</div>;
  // }
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      {/* <p>{session.user.email}</p> */}
      <Button type="submit">Logout</Button>
    </form>
  );
}
