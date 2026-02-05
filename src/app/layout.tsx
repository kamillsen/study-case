/**
 * Kök layout — tüm sayfalarda geçerli.
 * Yapı: Header (sabit) + main {children} (sayfaya göre değişen ara kısım) + Footer (sabit).
 */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Bebas_Neue, Oswald } from "next/font/google";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { GridOverlay } from "@/components/ui/grid-overlay";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mağaza",
  description: "E-ticaret mağaza uygulaması",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${bebasNeue.variable} ${oswald.variable} flex min-h-screen flex-col antialiased`}
      >
        {/* Her sayfada aynı üst başlık */}
        <Header />
        {/* Sayfaya göre değişen içerik — 12 grid: children kendi col-span'lerini kullanır */}
        <main className="flex-1">
          <div className="grid grid-cols-12 gap-4 px-4 py-6 md:gap-6 md:px-6">
            {children}
          </div>
        </main>
        {/* Her sayfada aynı alt bilgi */}
        <Footer />
        {/* ?grid=1 ile 12 grid çizgilerini göster */}
        <GridOverlay />
      </body>
    </html>
  );
}
