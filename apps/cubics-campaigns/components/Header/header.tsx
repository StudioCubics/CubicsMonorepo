import Link from "next/link";
import { auth } from "@/auth";
import UserAccount from "./user-account";

export default async function Header() {
  const session = await auth();

  const AuthButtons = session?.user ? null : (
    <div>
      <Link href="/auth/register">Register</Link>
      <Link href="/auth/login">Login</Link>
    </div>
  );

  return (
    <nav>
      {AuthButtons}
      <UserAccount />
    </nav>
  );
}
