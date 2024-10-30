import { auth } from "@/auth";
import { IconButton } from "@studiocubics/core";

export default async function DashboardPage() {
  // const session = await auth();
  return (
    <div>
      dashboard:
      <br />
      {/* name : {session?.user.name} | verified :{" "} */}
      {/* {JSON.stringify(session?.user.verified)} */}
      {/* <EmailVerificationTemplate /> */}
      <IconButton>hello</IconButton>
    </div>
  );
}
