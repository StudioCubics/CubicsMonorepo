import type { ReactNode } from "react";

export default function layout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return <>{children}</>;
}
