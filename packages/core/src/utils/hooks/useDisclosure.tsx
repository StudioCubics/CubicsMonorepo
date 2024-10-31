"use client";
import { useState } from "react";

export default function useDisclosure(initialState: boolean = false) {
  const [open, setOpen] = useState(initialState);

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleToggle() {
    setOpen((prev) => !prev);
  }

  return { open, handleClose, handleOpen, handleToggle };
}
