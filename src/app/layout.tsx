"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "./_components/footer";
import { Inter } from "next/font/google";
import { Navigation } from "./_components/navigation";
import { useEffect, useState } from "react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const inter = Inter({ subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const metadata: Metadata = {
  title: "movie app",
  description: "Generated by create next app",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDark, setDarkMode] = useState(false);

  const handleMode = () => {
    setDarkMode(!isDark);
    console.log(isDark);
  };
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${
          inter.className
        } ${isDark && `dark`} `}
      >
        <main className="min-h-screen xl:px-15">
          <Navigation handleMode={handleMode} mode={isDark} />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
