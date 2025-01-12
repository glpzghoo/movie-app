import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "./_components/footer";
import { Inter } from "next/font/google";
import { Navigation } from "./_components/navigation";
import { Suspense, useEffect, useState } from "react";
import { Loading } from "./_components/movieDetails";
import { ThemeProvider } from "./ThemeProviler";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const inter = Inter({ subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "movie app",
  description: "movie app that can view all types of movies' informations",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${inter.className} justify-items-center`}
      >
        <Suspense fallback={<Loading />}>
          <main className="min-h-screen w-[80%]">
            <ThemeProvider>
              <Navigation />
              {children}
            </ThemeProvider>
          </main>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
