"use client";

// Her sayfada sabit görünen üst başlık (Header).
// Soldan sağa: SHOP.CO, Shop (dropdown), On Sale, New Arrivals, Brands, arama çubuğu, sepet, profil.
// shadcn: DropdownMenu, Input, Button, Sheet (mobil).

import Link from "next/link";
import { Menu, Search, ShoppingBag, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

// Nav linkleri — yan yana ayrı: On Sale, New Arrivals, Brands
const shopLinks = [
  { label: "On Sale", href: "/?filter=sale" },
  { label: "New Arrivals", href: "/?filter=new" },
  { label: "Brands", href: "/?filter=brands" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      {/* 12 grid: kartlarla aynı hiza — SHOP.CO ilk gridin bitişi, sepet/profil son gridin başlangıcı (gap üzerine -ml ile çekilmiş) */}
      <div className="grid h-14 grid-cols-12 items-center gap-10 px-10 md:gap-12 md:px-12">
        {/* Tüm içerik: sm+: kolon 2–11, sol/sağda -ml/-mr ile gap kadar taşarak
            SHOP.CO'yu ilk gridin bitişine, sepet/profili son gridin başlangıcına yaslar */}
        <div className="col-span-12 flex items-center justify-between gap-3 sm:col-span-10 sm:col-start-2 sm:-ml-10 sm:-mr-10 md:-ml-12 md:-mr-12 md:gap-6">
          {/* Logo — kalın (bold) SHOP.CO, ilk gridin bitişine hizalı */}
          <div className="flex shrink-0 items-center">
            <Link
              href="/"
              className="font-bold text-xl tracking-tight text-foreground md:text-2xl"
            >
              SHOP.CO
            </Link>
          </div>

          {/* Orta alan — masaüstü nav + arama (md ve üzeri) */}
          <div className="hidden flex-1 items-center justify-center gap-4 md:flex md:gap-6">
            {/* Shop — dropdown, On Sale / New Arrivals / Brands'ın solunda */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  Shop
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/?shop=ornek-1">örnek-1</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/?shop=ornek-2">örnek-2</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* On Sale, New Arrivals, Brands — yan yana ayrı linkler */}
            {shopLinks.map(({ label, href }) => (
              <Button key={label} variant="ghost" size="sm" asChild>
                <Link href={href}>{label}</Link>
              </Button>
            ))}

            {/* Arama çubuğu — büyüteç ikonu + placeholder \"for Products\" */}
            <div className="relative w-full max-w-sm">
              <Search className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" />
              <Input
                type="search"
                placeholder="for Products"
                className="h-9 pl-9"
                aria-label="Ürün ara"
              />
            </div>
          </div>

          {/* Sağ taraf — sepet + profil + mobil hamburger, son grid başlangıcına hizalı */}
          <div className="flex shrink-0 items-center gap-1">
            {/* Sepet ikonu */}
            <Button variant="ghost" size="icon" aria-label="Sepet" asChild>
              <Link href="/cart">
                <ShoppingBag className="size-5" />
              </Link>
            </Button>
            {/* Profil ikonu */}
            <Button variant="ghost" size="icon" aria-label="Profil" asChild>
              <Link href="/profile">
                <User className="size-5" />
              </Link>
            </Button>

            {/* Mobil menü — hamburger, tıklanınca Sheet */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Menüyü aç">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <SheetHeader>
                  <SheetTitle>Menü</SheetTitle>
                </SheetHeader>
                <Separator className="my-4" />
                <nav className="flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    className="justify-start font-medium"
                    asChild
                  >
                    <Link href="/">SHOP.CO</Link>
                  </Button>
                  <Separator />
                  <span className="text-muted-foreground px-2 text-sm">
                    Shop
                  </span>
                  {shopLinks.map(({ label, href }) => (
                    <Button
                      key={label}
                      variant="ghost"
                      className="justify-start"
                      asChild
                    >
                      <Link href={href}>{label}</Link>
                    </Button>
                  ))}
                  <Separator />
                  <div className="relative">
                    <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                    <Input placeholder="for Products" className="pl-9" />
                  </div>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/cart">Sepet</Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/profile">Profil</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
