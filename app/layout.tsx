import type React from "react";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import { Poppins } from "next/font/google";
import TrackingProviders from "@/providers/tracking-providers";
import "./globals.css";
import Whatsapp from "@/components/whatsapp";

export const metadata: Metadata = {
  title: "Braga Experience - Professional Videography & Photography",
  description:
    "From corporate films to creative content - we make visuals that move audiences.",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/yeg6fkb.css" />
      </head>

      <body className={`font-sans ${poppins.className} overflow-x-hidden`}>
        {/* Moved inside body so scripts execute correctly */}
        <TrackingProviders />
        <Suspense fallback={null}>
          {children}
          <Toaster />
          <Whatsapp />
        </Suspense>
      </body>
    </html>
  );
}
