"use client";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type ColorSchemeProps = {
  defaultScheme?: "dark" | "light" | "system";
  children: Readonly<ReactNode>;
};

export type ColorSchemeContextProps = {
  currentScheme: "dark" | "light";
  setDarkMode(): void;
  setLightMode(): void;
};
const ColorSchemeContext = createContext<ColorSchemeContextProps | null>(null);

export const useColorScheme = () => {
  const c = useContext(ColorSchemeContext);
  if (!c) {
    throw new Error("Components must be wrapped in <ColorScheme/>");
  }
  return c;
};
export default function ColorScheme({
  defaultScheme = "system",
  children,
}: ColorSchemeProps) {
  const [currentScheme, setCurrentScheme] =
    useState<ColorSchemeContextProps["currentScheme"]>("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.matchMedia("(prefers-color-scheme: dark)")) {
        setDarkMode();
      } else {
        setLightMode();
      }
    }
  }, []);

  useEffect(() => {
    if (defaultScheme == "light") return;
    if (defaultScheme == "dark") {
      setDarkMode();
    } else if (typeof window != "undefined") {
      window.matchMedia("(prefers-color-scheme: dark)")
        ? setDarkMode()
        : setLightMode();
    }
  }, [defaultScheme]);

  const setDarkMode = useCallback(() => {
    setCurrentScheme("dark");
    document.body.classList.add("dark");
  }, []);

  const setLightMode = useCallback(() => {
    setCurrentScheme("light");
    document.body.classList.remove("dark");
  }, []);

  return (
    <ColorSchemeContext.Provider
      value={{ currentScheme, setDarkMode, setLightMode }}
    >
      {children}
    </ColorSchemeContext.Provider>
  );
}
