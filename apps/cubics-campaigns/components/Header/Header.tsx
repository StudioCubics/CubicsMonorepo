import AccountControls from "./AccountControls";
import { AppBar } from "@studiocubics/core";
import ColorSchemeToggle from "./ColorSchemeToggle";
import { auth } from "@/auth";

export default async function Header() {
  const session = await auth();
  return (
    <AppBar>
      <ColorSchemeToggle />
      <AccountControls session={session} />
    </AppBar>
  );
}
