import { auth } from "@/auth";
import React, { ReactNode } from "react";

export default async function layout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return <>{children}</>;
}
