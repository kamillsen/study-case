import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Github,
  Instagram,
  Twitter,
} from "lucide-react";

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
    <footer className="mt-auto w-full border-t bg-[#F0F0F0] relative z-0 pt-20 md:pt-24">
      <div className="grid grid-cols-12 gap-10 px-10 pb-12 text-sm text-muted-foreground md:gap-12 md:px-12 md:pb-14">
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
