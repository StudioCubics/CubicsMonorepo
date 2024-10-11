import { auth, signOut } from "@/auth";
import React from "react";

export default async function DashboardPage() {
  const session = await auth();
  return (
    <div>
      dashboard:
      <br />
      name : {session?.user?.name} | verified :{" "}
      {JSON.stringify(session?.user.verified)}
    </div>
  );
}
