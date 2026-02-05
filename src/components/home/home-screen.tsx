import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { BrowseByDressStyleSection } from "@/components/home/browse-by-dress-style";

/**
 * Sitenin ana ekranı — ana sayfada render edilen bileşen.
 * 12 grid: Hero’nun tamamının arka planı görsel; üzerinde sol içerik + sağ boş alan.
 */
export function HomeScreen() {
  return (
    <div className="col-span-12 -mx-4 -mt-6 flex flex-col md:-mx-6 md:-mt-6">
      {/* HERO SECTION — Header ve sağ/sol kenarlara yaslı, köşeler düz */}
      <section
        className="relative min-h-[85vh] w-full overflow-hidden bg-cover bg-right bg-no-repeat"
        style={{ backgroundImage: "url(/img/image.png)" }}
      >
        {/* Layout ile aynı hiza: main grid px-4 md:px-6 → içerik ml-4 + w calc(100%-2*px) */}
        <div className="relative ml-4 grid min-h-[85vh] w-[calc(100%-2rem)] grid-cols-12 items-center gap-10 py-8 md:ml-6 md:gap-12 md:w-[calc(100%-3rem)] lg:py-12">
          {/* Boş 1. kolon — içerik ilk gridin bitişinden başlar (grid boşluğu atlanmaz: -ml ile gap kadar sola çekildi) */}
          <div className="col-span-1" aria-hidden />
          <div className="-ml-10 col-span-11 flex max-w-2xl flex-col md:col-span-5 md:-ml-12 md:pr-0">
            <h1 className="mb-4 text-3xl font-bold uppercase leading-tight tracking-wide text-foreground md:text-4xl lg:text-5xl">
              Find Clothes
              <br />
              That Matches
              <br />
              Your Style
            </h1>
            <div className="mb-6 text-muted-foreground md:text-lg">
              <p>
                Browse through our diverse range of meticulously crafted
                garments, designed
              </p>
              <p>
                to bring out your individuality and cater to your sense of
                style.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="mb-8 w-fit rounded-full text-base"
            >
              <Link href="/products">Shop Now</Link>
            </Button>

            {/* Stats — görsel üstünde, aralarında dikey soluk çizgi */}
            <div className="flex flex-wrap items-center gap-10 text-foreground md:gap-12">
              <div>
                <p className="text-2xl font-bold">200+</p>
                <p className="text-sm text-muted-foreground">
                  International Brands
                </p>
              </div>
              <div className="h-10 w-px shrink-0 bg-border/60" aria-hidden />
              <div>
                <p className="text-2xl font-bold">2,000+</p>
                <p className="text-sm text-muted-foreground">
                  High-Quality Products
                </p>
              </div>
              <div className="h-10 w-px shrink-0 bg-border/60" aria-hidden />
              <div>
                <p className="text-2xl font-bold">30,000+</p>
                <p className="text-sm text-muted-foreground">
                  Happy Customers
                </p>
              </div>
            </div>
          </div>

          {/* Sağ 6 kolon — arka plan görseli burada da görünür */}
          <div className="col-span-12 hidden md:col-span-6 md:block" aria-hidden />
        </div>
      </section>

      {/* BRAND STRIP — siyah arka plan, beyaz büyük harf, eşit kolonlarda ortalanmış markalar */}
      <section
        className="-mx-4 grid w-[calc(100%+2rem)] grid-cols-5 bg-black py-8 md:-mx-6 md:w-[calc(100%+3rem)] md:py-11"
        aria-label="Featured brands"
      >
        <div
          className="flex items-center justify-center text-3xl font-medium uppercase tracking-wide text-white md:text-4xl"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Versace
        </div>
        <div
          className="flex items-center justify-center text-3xl font-medium uppercase tracking-wide text-white md:text-4xl"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          Zara
        </div>
        <div
          className="flex items-center justify-center text-3xl font-medium uppercase tracking-wide text-white md:text-4xl"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Gucci
        </div>
        <div
          className="flex items-center justify-center text-3xl font-medium uppercase tracking-wide text-white md:text-4xl"
          style={{ fontFamily: "var(--font-oswald), sans-serif" }}
        >
          Prada
        </div>
        <div
          className="flex items-center justify-center text-3xl font-medium uppercase tracking-[0.2em] text-white md:text-4xl"
          style={{ fontFamily: "var(--font-bebas), sans-serif" }}
        >
          Calvin Klein
        </div>
      </section>

      {/* NEW ARRIVALS — başlık ortada; kartlar eşit genişlik, ilk grid bitişinden son grid başlangıcına */}
      <section className="col-span-12 mt-12 flex flex-col gap-6 px-4 md:mt-16 md:px-6">
        <h2 className="text-center text-2xl font-bold uppercase tracking-wide text-foreground md:text-3xl">
          New Arrivals
        </h2>
        <div className="grid grid-cols-12 gap-10 md:gap-12">
          <div className="col-span-1 hidden sm:block" aria-hidden />
          <div className="col-span-12 grid grid-cols-1 gap-10 sm:col-span-10 sm:-ml-10 sm:-mr-10 sm:grid-cols-4 md:gap-12 md:-ml-12 md:-mr-12">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
          <div className="col-span-1 hidden sm:block" aria-hidden />
        </div>
        <div className="flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/products">View All</Link>
          </Button>
        </div>
      </section>

      {/* Ayırıcı çizgi — View All ile Top Selling arası eşit boşluk (üst/alt my-8) */}
      <div className="col-span-12 my-8 px-4 md:my-10 md:px-6" aria-hidden>
        <hr className="border-0 h-px w-full" style={{ backgroundColor: "#0000001A" }} />
      </div>

      {/* TOP SELLING — başlık ortada; kartlar eşit genişlik, ilk grid bitişinden son grid başlangıcına */}
      <section className="col-span-12 flex flex-col gap-6 px-4 md:px-6">
        <h2 className="text-center text-2xl font-bold uppercase tracking-wide text-foreground md:text-3xl">
          Top Selling
        </h2>
        <div className="grid grid-cols-12 gap-10 md:gap-12">
          <div className="col-span-1 hidden sm:block" aria-hidden />
          <div className="col-span-12 grid grid-cols-1 gap-10 sm:col-span-10 sm:-ml-10 sm:-mr-10 sm:grid-cols-4 md:gap-12 md:-ml-12 md:-mr-12">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
          <div className="col-span-1 hidden sm:block" aria-hidden />
        </div>
        <div className="flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/products">View All</Link>
          </Button>
        </div>
      </section>

      <BrowseByDressStyleSection />
    </div>
  );
}
