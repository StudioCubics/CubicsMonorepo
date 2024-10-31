"use client";
import { useRef } from "react";
import { handleSignOut } from "@/lib/authjs/actions";
import { Avatar, Button, IconButton, useDisclosure } from "@studiocubics/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Popover from "../Popover/Popover";

export default function AccountControls() {
  const { data: session } = useSession();
  const { open, handleClose, handleToggle, handleOpen } = useDisclosure();
  const anchorEl = useRef<HTMLButtonElement>(null);
  // if (!session) {
  //   return (
  //     <div>
  //       <Link href="/auth/register">Register</Link>
  //       <Link href="/auth/login">Login</Link>
  //     </div>
  //   );
  // }
  return (
    <>
      <IconButton
        variant="ghost"
        id="button-check"
        ref={anchorEl}
        onClick={handleToggle}
      >
        <Avatar
          // image={session.user.image}
          displayName={"Chekcit Pinga"}
        />
      </IconButton>
      <Popover open={open} onClose={handleClose} anchorEl={anchorEl}>
        <Button onClick={handleClose}>Close</Button>
        <Button type="submit" onClick={handleSignOut}>
          Logout
        </Button>
      </Popover>
    </>
  );
}
