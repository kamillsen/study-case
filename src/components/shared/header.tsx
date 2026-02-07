"use client";

import Link from "next/link";
import { Menu, Search, ShoppingCart, ChevronDown, User } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
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

const shopLinks = [
  { label: "On Sale", href: "/?filter=sale" },
  { label: "New Arrivals", href: "/?filter=new" },
  { label: "Brands", href: "/?filter=brands" },
];

export function Header() {
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full min-w-0 max-w-full border-b bg-background">
      <div className="grid h-16 max-w-full grid-cols-12 items-center gap-10 px-10 md:gap-12 md:px-12">
        <div className="col-span-12 flex items-center justify-between gap-3 sm:col-span-10 sm:col-start-2 sm:-ml-10 sm:-mr-10 md:-ml-12 md:-mr-12 md:gap-6">
          <div className="flex shrink-0 items-center">
            <Link
              href="/"
              className="font-bold text-xl tracking-tight text-foreground md:text-2xl"
            >
              SHOP.CO
            </Link>
          </div>

          <div className="hidden flex-1 items-center justify-center gap-4 md:flex md:gap-6">
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

            {shopLinks.map(({ label, href }) => (
              <Button key={label} variant="ghost" size="sm" asChild>
                <Link href={href}>{label}</Link>
              </Button>
            ))}

            <div className="relative w-full max-w-sm">
              <Search className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" />
              <Input
                type="search"
                placeholder="for Products"
                className="h-10 rounded-full bg-[#F0F0F0] pl-9"
                aria-label="Ürün ara"
              />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label={cartCount > 0 ? `Sepet (${cartCount} ürün)` : "Sepet"}
              asChild
              className="relative"
            >
              <Link href="/basket">
                <ShoppingCart className="size-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1.5 text-[10px] font-semibold text-background">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Profil" asChild>
              <Link href="/profile">
                <User className="size-5" />
              </Link>
            </Button>
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
                    <Input
                      placeholder="for Products"
                      className="rounded-full bg-[#F0F0F0] pl-9"
                    />
                  </div>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/basket">Sepet</Link>
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
