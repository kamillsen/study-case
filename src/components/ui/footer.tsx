// Her sayfada sabit görünen alt bilgi (Footer) bileşeni.
// Telif metni ve Ana Sayfa / Sepet linkleri içerir.

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mt-auto w-full border-t bg-background">
      <Separator />
      {/* 12 grid: telif(6) | nav(6) — ayarlama için col-span değiştirilebilir */}
      <div className="grid grid-cols-12 gap-4 px-4 py-6 text-sm text-muted-foreground md:px-6">
        <p className="col-span-12 md:col-span-6">
          © {new Date().getFullYear()} Mağaza. Tüm hakları saklıdır.
        </p>
        <nav className="col-span-12 flex gap-6 md:col-span-6 md:justify-end">
          <Link href="/" className="hover:text-foreground">
            Ana Sayfa
          </Link>
          <Link href="/cart" className="hover:text-foreground">
            Sepet
          </Link>
        </nav>
      </div>
    </footer>
  );
}
