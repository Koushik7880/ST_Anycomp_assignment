// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Red_Hat_Display } from "next/font/google";
import AppThemeProvider from "./providers/ThemeProvider";

const redHat = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-red-hat",
});

export const metadata: Metadata = {
  title: "Anycomp Admin",
  description: "Specialists management dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={redHat.variable}>
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}
