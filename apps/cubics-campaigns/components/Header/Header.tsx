import Link from "next/link";
import UserAccount from "./UserAccount";
import { AppBar } from "@studiocubics/core";
import ColorSchemeToggle from "./ColorSchemeToggle";
export default async function Header() {
  // const session = await auth();

  const AuthButtons = (
    //  session?.user ? null :
    <div>
      <Link href="/auth/register">Register</Link>
      <Link href="/auth/login">Login</Link>
    </div>
  );

  return (
    <AppBar>
      <ColorSchemeToggle />
      {AuthButtons}
      <UserAccount />
    </AppBar>
  );
}
