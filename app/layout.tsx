import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const fonts = localFont({
  display: "swap",
  preload: true,
  variable: "--font-sans",
  src: [
    { path: "../public/fonts/Inter-SemiBold.woff", weight: "600" },
    { path: "../public/fonts/Inter-SemiBold.woff2", weight: "600" },
    { path: "../public/fonts/Inter-Regular.woff", weight: "400" },
    { path: "../public/fonts/Inter-Regular.woff2", weight: "400" },
  ],
});

export const metadata: Metadata = {
  title: "Ростелеком",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={cn(
          "min-h-dvh bg-background font-sans antialiased",
          fonts.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
