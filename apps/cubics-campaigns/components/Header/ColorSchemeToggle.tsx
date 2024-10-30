"use client";
import { Button, useColorScheme } from "@studiocubics/core";
import React from "react";

export default function ColorSchemeToggle() {
  const { setDarkMode, setLightMode, currentScheme } = useColorScheme();

  return (
    <div>
      {currentScheme}
      <Button variant="ghost" onClick={setLightMode}>
        Light
      </Button>
      <Button variant="ghost" onClick={setDarkMode}>
        Dark
      </Button>
    </div>
  );
}
