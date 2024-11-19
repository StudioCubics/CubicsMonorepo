"use client";
import { useRef } from "react";
import { handleSignOut } from "@/lib/authjs/actions";
import { Avatar, Button, IconButton, useDisclosure } from "@studiocubics/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Popover from "../Popover/Popover";

export default function AccountControls() {
  const { data: session, status } = useSession();
  const { open, handleClose, handleOpen } = useDisclosure();
  const anchorEl = useRef<HTMLButtonElement>(null);
  if (status == "unauthenticated")
    return (
      <div>
        <Link href="/auth/register">Register</Link>
        <Link href="/auth/login">Login</Link>
      </div>
    );
  return (
    <>
      <IconButton
        variant="ghost"
        id="button-check"
        ref={anchorEl}
        onClick={handleOpen}
      >
        <Avatar
          image={session?.user.image}
          displayName={
            session?.user.name ??
            session?.user.email ??
            session?.user.id ??
            "AN"
          }
        />
      </IconButton>

      <Popover
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        <Button onClick={handleClose}>Close</Button>
        <Button type="submit" onClick={handleSignOut}>
          Logout
        </Button>
      </Popover>
    </>
  );
}
