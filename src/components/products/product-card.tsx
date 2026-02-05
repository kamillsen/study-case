import { cn } from "@/lib/utils";

/**
 * Ürün kartı — içerik sonra eklenecek, şimdilik boş kart kabı.
 * 12 grid’de col-span-3 (4 kart yan yana) veya col-span-6 (2 kart) kullanılabilir.
 */
export function ProductCard({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "flex min-h-[340px] flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm",
        className
      )}
    >
      {children ?? (
        <div className="flex flex-1 items-center justify-center p-6 text-muted-foreground">
          Product Card
        </div>
      )}
    </article>
  );
}
