import { ForwardedRef, MutableRefObject, Ref } from "react";

type ReactRef<T> = ForwardedRef<T> | Ref<T> | null;

const mergeRefs = (...refs: ReactRef<HTMLElement>[]) => {
  return (node: HTMLElement) => {
    for (const ref of refs) {
      if (ref) {
        // Check if ref is a RefObject
        (ref as MutableRefObject<HTMLElement>).current = node; // Assign to current if it's a RefObject
      }
    }
  };
};

export default mergeRefs;
