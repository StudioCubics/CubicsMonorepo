"use client";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type ColorSchemeProps = {
  children: Readonly<ReactNode>;
};

type CurrentScheme = "dark" | "light";

export type ColorSchemeContextProps = {
  currentScheme?: CurrentScheme;
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

export default function ColorScheme({ children }: ColorSchemeProps) {
  const [currentScheme, setCurrentScheme] = useState<CurrentScheme>();

  useEffect(() => {
    if (typeof window === "undefined") return;
    let scheme = window.localStorage.getItem("currentScheme") as CurrentScheme;
    if (scheme == "dark") {
      document.body.classList.add("dark");
      setCurrentScheme("dark");
    } else {
      document.body.classList.remove("dark");
      setCurrentScheme("light");
    }
  }, []);
  function setDarkMode() {
    document.body.classList.add("dark");
    localStorage.setItem("currentScheme", "dark");
    setCurrentScheme("dark");
  }
  function setLightMode() {
    document.body.classList.remove("dark");
    localStorage.setItem("currentScheme", "light");
    setCurrentScheme("light");
  }

  return (
    <ColorSchemeContext.Provider
      value={{ currentScheme, setDarkMode, setLightMode }}
    >
      {children}
    </ColorSchemeContext.Provider>
  );
}
