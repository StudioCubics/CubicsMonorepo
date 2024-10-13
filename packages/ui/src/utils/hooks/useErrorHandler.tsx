"use client";
import { ReactNode, useState } from "react";

export default function useErrorHandler() {
  const [errorMsg, setErrorMsg] = useState<string>("");
  const handleError = (err: any) => {
    if (err == null) return;
    setErrorMsg(err);
    return;
  };

  const errorAlert: ReactNode = (
    <p style={{ color: "var(--danger)", textAlign: "center" }}>{errorMsg}</p>
  );
  return { errorAlert, errorMsg, handleError };
}
