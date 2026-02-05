import { cn } from "@/lib/utils";

const cardBase =
  "relative block min-h-[200px] overflow-hidden rounded-lg border border-border bg-white bg-center bg-no-repeat md:min-h-[260px]";

const STYLES = [
  { image: "/img/casual.png", label: "Casual" },
  { image: "/img/formal.png", label: "Normal" },
  { image: "/img/party.png", label: "Party" },
  { image: "/img/gym.png", label: "Gym" },
] as const;

/**
 * Browse by Dress Style — koyu alan: sol ilk grid bitişi, sağ son grid başlangıcı. Kartlar: col 2–11.
 */
export function BrowseByDressStyleSection() {
  return (
    <div className="grid grid-cols-12 gap-10 px-10 pt-12 md:gap-12 md:px-12 md:pt-16">
      <div className="col-span-1 hidden sm:block" aria-hidden />
      <section
        className="col-span-12 min-w-0 rounded-2xl py-10 sm:col-span-10 sm:-ml-10 sm:-mr-10 md:-ml-12 md:-mr-12 md:py-12"
        style={{ backgroundColor: "#F0F0F0" }}
        aria-labelledby="browse-by-dress-style-heading"
      >
        <h2
          id="browse-by-dress-style-heading"
          className="mb-6 px-10 text-center text-2xl font-bold uppercase tracking-wide text-foreground md:mb-8 md:px-12 md:text-3xl"
        >
          Browse by Dress Style
        </h2>
        {/* Kartlar: soldan 2. gridin başına, sağdan 11. gridin sonuna (grid boşluklarını atla) */}
        <div className="grid grid-cols-12 gap-10 pl-10 pr-10 md:gap-12 md:pl-12 md:pr-12">
          {STYLES.map((style, index) => {
            const colSpan = index === 0 || index === 3 ? "sm:col-span-5" : "sm:col-span-7";
            return (
              <div key={style.label} className={cn("col-span-12", colSpan)}>
                <div
                  className={cn(cardBase)}
                  style={{ backgroundImage: `url(${style.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                  role="img"
                  aria-label={style.label}
                >
                  <span className="absolute left-4 top-4 text-lg font-semibold text-foreground md:left-5 md:top-5 md:text-xl">
                    {style.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <div className="col-span-1 hidden sm:block" aria-hidden />
    </div>
  );
}
