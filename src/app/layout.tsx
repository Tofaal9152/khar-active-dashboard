import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/query-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Khar Active Dashboard",
  description:
    "A dashboard for monitoring and managing your Khar Active application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <ThemeProviderWrapper> */}
        <QueryProvider>{children}</QueryProvider>
        <Toaster position="bottom-right" richColors />
        {/* </ThemeProviderWrapper> */}
      </body>
    </html>
  );
}
