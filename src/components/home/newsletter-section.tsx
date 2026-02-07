import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  return (
    <section
      className="col-span-12 mt-16 -mb-16 px-10 md:mt-20 md:-mb-24 md:px-12 relative z-10"
      aria-labelledby="newsletter-heading"
    >
      <div className="grid grid-cols-12 gap-10 md:gap-12">
        <div className="col-span-1 hidden sm:block" aria-hidden />
        <div className="col-span-12 sm:col-span-10 sm:-ml-10 sm:-mr-10 md:-ml-12 md:-mr-12">
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
        <div className="col-span-1 hidden sm:block" aria-hidden />
      </div>
    </section>
  );
}
