import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import "./global.css";
import Navbar from "./components/Navbar";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nudgee",
  description: "Nudgee - Chat Anywhere",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="sunset">
      <body className={inter.className}>
        <Providers>
          {" "}
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
