import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muthupalasa 2026",
  description: "Join us for an unforgettable experience",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} h-[100svh] max-h-[100svh] overflow-hidden antialiased dark`}
    >
      <body className="h-[100svh] max-h-[100svh] overflow-hidden flex flex-col bg-[#0b1528] text-gold-400 font-sans selection:bg-gold-500 selection:text-navy-900">
        {children}
      </body>
    </html>
  );
}
