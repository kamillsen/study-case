import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products";
import { BrowseByDressStyleSection } from "./browse-by-dress-style";
import { TestimonialsSection } from "./testimonials-section";
import { NewsletterSection } from "./newsletter-section";
import { NewArrivalsSection } from "./new-arrivals-section";
import { TopSellingSection } from "./top-selling-section";

export function HomeScreen() {
  return (
    <div className="col-span-12 -mx-10 -mt-6 flex flex-col md:-mx-12 md:-mt-6">
      <section
        className="relative min-h-[85vh] w-full overflow-hidden bg-cover bg-right bg-no-repeat"
        style={{ backgroundImage: "url(/img/image.png)" }}
      >
        <div className="relative ml-10 grid min-h-[85vh] w-[calc(100%-5rem)] grid-cols-12 items-center gap-10 py-8 md:ml-12 md:gap-12 md:w-[calc(100%-6rem)] lg:py-12">
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

          <div className="col-span-12 hidden md:col-span-6 md:block" aria-hidden />
        </div>
      </section>

      <section
        className="-mx-10 grid w-[calc(100%+5rem)] grid-cols-5 bg-black py-8 md:-mx-12 md:w-[calc(100%+6rem)] md:py-11"
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

      <NewArrivalsSection />

      <div className="col-span-12 my-8 px-10 md:my-10 md:px-12" aria-hidden>
        <hr
          className="border-0 h-px w-full"
          style={{ backgroundColor: "#0000001A" }}
        />
      </div>

      <TopSellingSection />

      <BrowseByDressStyleSection />

      <TestimonialsSection />

      <NewsletterSection />
    </div>
  );
}
