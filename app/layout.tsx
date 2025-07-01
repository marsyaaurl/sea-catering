import type { Metadata } from "next";
import { Manrope, Krona_One } from "next/font/google";
import "./globals.css";
import SupabaseProvider from "@/lib/SupabaseProvider";

// Manrope Font
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

// Krona One Font
const kronaOne = Krona_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-krona-one",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sea Catering",
  description: "",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${kronaOne.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
