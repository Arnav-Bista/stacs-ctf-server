import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import MurrayCurveBackground from "./background";


const firaCode = Fira_Code({
  variable: "--font-fira-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "STACS CTF",
  description: "STACS CTF 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${firaCode.className} ${firaCode.variable} antialiased`}
      >
        {/* <MurrayCurveBackground /> */}
        {children}
      </body>
    </html>
  );
}
