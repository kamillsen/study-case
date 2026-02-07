import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import {
  Facebook,
  Github,
  Instagram,
  Twitter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const companyLinks = ["About", "Features", "Works", "Career"];
const helpLinks = ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"];
const faqLinks = ["Account", "Manage Deliveries", "Orders", "Payments"];
const resourcesLinks = [
  "Free eBooks",
  "Development Tutorial",
  "How to - Blog",
  "Youtube Playlist",
];

export function Footer() {
  return (
    <footer className="mt-auto w-full max-w-full min-w-0 relative z-0">
      {/* Üst %25: beyaz alan – newsletter kutusunun yarısı burada */}
      <section
        className="min-h-[25vh] w-full max-w-full min-w-0 bg-white pt-20 md:pt-24 flex flex-col justify-end"
        aria-labelledby="newsletter-heading"
      >
        {/* Newsletter kutusu: yarısı beyaz bölgede, yarısı gri bölgede (negatif margin ile) */}
        <div className="w-full max-w-full min-w-0 px-10 md:px-12 -mb-20">
          <div className="flex flex-col gap-8 rounded-3xl bg-black px-8 py-10 text-white md:flex-row md:items-center md:justify-between md:px-14 md:py-12">
            <div className="max-w-xl">
              <h2
                id="newsletter-heading"
                className="text-2xl font-bold uppercase leading-tight tracking-wide md:text-3xl lg:text-4xl"
              >
                Stay up to date about
                <br />
                our latest offers
              </h2>
            </div>
            <form className="flex w-full max-w-md flex-col gap-3">
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                  <Mail className="size-4" aria-hidden />
                </span>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-11 rounded-full border-none bg-white text-sm text-foreground pl-9 pr-4"
                />
              </div>
              <Button
                type="submit"
                className="h-11 rounded-full bg-white text-sm font-medium text-black hover:bg-white/90"
              >
                Subscribe to Newsletter
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Alt %75: #F0F0F0 – newsletter kutusunun diğer yarısı + linkler, telif */}
      <div className="bg-[#F0F0F0] pt-28 md:pt-32 grid max-w-full grid-cols-12 gap-10 px-10 pb-12 text-sm text-muted-foreground md:gap-12 md:px-12 md:pb-14">
        <div className="col-span-12 space-y-6 md:col-span-4">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-foreground md:text-2xl"
          >
            SHOP.CO
          </Link>
          <p className="max-w-xs text-xs md:text-sm">
            We have clothes that suits your style and which you&apos;re proud to
            wear. From women to men.
          </p>
          <div className="flex items-center gap-3 text-foreground">
            <Link href="#" aria-label="Shop.co on Twitter" className="flex size-8 items-center justify-center rounded-full bg-white text-foreground hover:bg-white/90">
              <Twitter className="size-4" />
            </Link>
            <Link href="#" aria-label="Shop.co on Facebook" className="flex size-8 items-center justify-center rounded-full bg-white text-foreground hover:bg-white/90">
              <Facebook className="size-4" />
            </Link>
            <Link href="#" aria-label="Shop.co on Instagram" className="flex size-8 items-center justify-center rounded-full bg-white text-foreground hover:bg-white/90">
              <Instagram className="size-4" />
            </Link>
            <Link href="#" aria-label="Shop.co on GitHub" className="flex size-8 items-center justify-center rounded-full bg-white text-foreground hover:bg-white/90">
              <Github className="size-4" />
            </Link>
          </div>
        </div>

        <div className="col-span-12 grid grid-cols-2 gap-8 text-xs md:col-span-8 md:grid-cols-4 md:text-sm">
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground md:text-sm">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((item) => (
                <li key={item}><Link href="#" className="hover:text-foreground">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground md:text-sm">Help</h3>
            <ul className="space-y-2">
              {helpLinks.map((item) => (
                <li key={item}><Link href="#" className="hover:text-foreground">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground md:text-sm">FAQ</h3>
            <ul className="space-y-2">
              {faqLinks.map((item) => (
                <li key={item}><Link href="#" className="hover:text-foreground">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground md:text-sm">Resources</h3>
            <ul className="space-y-2">
              {resourcesLinks.map((item) => (
                <li key={item}><Link href="#" className="hover:text-foreground">{item}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-span-12 mt-6 flex flex-col gap-4 border-t border-border/40 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:text-sm">
          <p>Shop.co © 2000-{new Date().getFullYear()} All Rights Reserved</p>
          <div className="flex items-center gap-3" aria-label="Ödeme yöntemleri">
            <span className="flex h-8 items-center rounded-md bg-white px-2.5 py-1.5 shadow-xs">
              <Image src="/icons/payment/visa.svg" alt="Visa" width={40} height={24} className="h-5 w-auto object-contain" unoptimized />
            </span>
            <span className="flex h-8 items-center rounded-md bg-white px-2.5 py-1.5 shadow-xs">
              <Image src="/icons/payment/mastercard.svg" alt="Mastercard" width={40} height={24} className="h-5 w-auto object-contain" unoptimized />
            </span>
            <span className="flex h-8 items-center rounded-md bg-white px-2.5 py-1.5 shadow-xs">
              <Image src="/icons/payment/paypal.svg" alt="PayPal" width={40} height={24} className="h-5 w-auto object-contain" unoptimized />
            </span>
            <span className="flex h-8 items-center rounded-md bg-white px-2.5 py-1.5 shadow-xs">
              <Image src="/icons/payment/googlepay.svg" alt="Google Pay" width={40} height={24} className="h-5 w-auto object-contain" unoptimized />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
