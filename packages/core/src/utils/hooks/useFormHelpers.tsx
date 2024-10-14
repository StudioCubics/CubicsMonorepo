"use client";
import { useState } from "react";

export default function useFormHelpers(initialLoadingState = false) {
  const [loading, setLoading] = useState<boolean>(initialLoadingState);

  function startLoading() {
    setLoading(true);
  }
  function endLoading() {
    setLoading(false);
  }
  function showErrorToast(error: string) {
    alert(error);
  }

  return { loading, startLoading, endLoading, showErrorToast };
}
