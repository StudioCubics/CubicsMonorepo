"use client";
import { Button, useColorScheme } from "@studiocubics/core";
import React from "react";

export default function ColorSchemeToggle() {
  const { setDarkMode, setLightMode, currentScheme } = useColorScheme();

  return (
    <Button
      variant="ghost"
      onClick={() =>
        currentScheme == "light" ? setDarkMode() : setLightMode()
      }
    >
      {currentScheme == "dark" ? "Light" : "Dark"}
    </Button>
  );
}
