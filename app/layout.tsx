import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('RootLayout component has been rendered'); // コンソールログを追加

  return (
    <html lang="en">
      <head>
        <title>My Next.js App</title>
      </head>
      <body className={inter.className}>
        <header className="bg-blue-500 text-white p-4">
          <h1>My Next.js App</h1>
        </header>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
