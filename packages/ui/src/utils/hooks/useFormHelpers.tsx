import { useState } from "react";
import toast from "react-hot-toast";

export default function useFormHelpers(initialLoadingState = false) {
  const [loading, setLoading] = useState<boolean>(initialLoadingState);

  function startLoading() {
    setLoading(true);
  }
  function endLoading() {
    setLoading(false);
  }
  function showErrorToast(error: string) {
    toast.error(error);
  }

  return { loading, startLoading, endLoading, showErrorToast };
}
