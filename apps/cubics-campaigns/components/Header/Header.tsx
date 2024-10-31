import AccountControls from "./AccountControls";
import { AppBar } from "@studiocubics/core";
import ColorSchemeToggle from "./ColorSchemeToggle";

export default async function Header() {
  return (
    <AppBar>
      <ColorSchemeToggle />
      <AccountControls />
    </AppBar>
  );
}
