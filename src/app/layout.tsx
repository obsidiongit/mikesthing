import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import PinGate from "@/components/PinGate";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Devmike Mission Control",
  description: "Personal productivity dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full w-full flex overflow-hidden bg-background text-foreground">
        <PinGate>
          <Sidebar />
          <main className="flex-1 h-full overflow-hidden flex flex-col">
            {children}
          </main>
        </PinGate>
      </body>
    </html>
  );
}
