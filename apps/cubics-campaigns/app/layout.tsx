import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import Header from "@/components/Header/Header";
import "@studiocubics/styles/cubicscampaigns";
import "@studiocubics/core/styles";
import { ColorScheme } from "@studiocubics/core";

const fontFamilyHeading = localFont({
  src: "./Outfit-VariableFont_wght.woff2",
  variable: "--font-h",
  display: "swap",
});
const fontFamilyBody = localFont({
  src: [
    { path: "./TitilliumWeb-Regular.woff2", weight: "400", style: "normal" },
    { path: "./TitilliumWeb-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-b",
  display: "swap",
});
export const metadata: Metadata = {
  title: { template: "%s | Cubics Campaigns", default: "Cubics Campaigns" },
  description:
    "Create Email and Marketing Campaigns to communicate with your user base!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <ColorScheme>
        <body
          className={`${fontFamilyHeading.variable} ${fontFamilyBody.variable}`}
        >
          <SessionProvider>
            <Header />
            {children}
          </SessionProvider>
        </body>
      </ColorScheme>
    </html>
  );
}
