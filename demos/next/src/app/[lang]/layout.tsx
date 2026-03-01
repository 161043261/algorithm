import type { Metadata } from "next";
import { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Next.js Demo",
  description: "Next.js Demo",
};

export default function RootLayout({
  children,
  header,
  footer,
}: Readonly<{
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="global_script"
          src="https://unpkg.com/vue@3/dist/vue.global.js"
        />
      </head>
      <body>
        {header}
        {children}
        {footer}
        <Link href="/switch">Switch header</Link>
      </body>
    </html>
  );
}
