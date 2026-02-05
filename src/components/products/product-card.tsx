import { cn } from "@/lib/utils";

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
        "flex min-h-[340px] flex-col overflow-hidden bg-background text-foreground",
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
