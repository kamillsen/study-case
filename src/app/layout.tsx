/**
 * Kök layout — tüm sayfalarda geçerli.
 * Yapı: Header (sabit) + main {children} (sayfaya göre değişen ara kısım) + Footer (sabit).
 */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Bebas_Neue, Oswald } from "next/font/google";
import { Header, Footer, GridOverlay } from "@/components/shared";
import { QueryProvider } from "@/app/providers/query-provider";
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
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${bebasNeue.variable} ${oswald.variable} flex min-h-screen min-w-0 flex-col overflow-x-hidden antialiased`}
      >
        {/* Her sayfada aynı üst başlık */}
        <Header />
        {/* Sayfaya göre değişen içerik — 12 grid: children kendi col-span'lerini kullanır */}
        <main className="min-w-0 flex-1">
          <QueryProvider>
            <div className="grid max-w-full grid-cols-12 gap-10 px-10 py-6 md:gap-12 md:px-12">
              {children}
            </div>
          </QueryProvider>
        </main>
        {/* Her sayfada aynı alt bilgi */}
        <Footer />
        {/* ?grid=1 ile 12 grid çizgilerini göster */}
        <GridOverlay />
      </body>
    </html>
  );
}
