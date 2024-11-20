"use client";
import { useRef } from "react";
import { handleSignOut } from "@/lib/authjs/actions";
import {
  Avatar,
  Button,
  IconButton,
  Popover,
  useDisclosure,
} from "@studiocubics/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Session } from "next-auth";
import { MenuAltLeft } from "@studiocubics/icons";

export default function AccountControls({
  session,
}: {
  session: Session | null;
}) {
  const { open, handleClose, handleOpen } = useDisclosure();
  const anchorEl = useRef<HTMLButtonElement>(null);
  if (!session)
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
