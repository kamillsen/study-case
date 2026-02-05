"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

/**
 * URL'de ?grid=1 varsa 12 grid çizgilerini ekranda gösterir.
 * Layout ile aynı padding/gap kullanır: px-4 md:px-6, gap-4 md:gap-6.
 */
function GridOverlayInner() {
  const searchParams = useSearchParams();
  const show = searchParams.get("grid") === "1";

  if (!show) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 flex justify-center"
      aria-hidden
    >
      <div className="flex h-full w-full max-w-full px-4 md:px-6">
        <div className="grid h-full w-full grid-cols-12 gap-4 md:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="border-x border-dashed border-primary/40 bg-primary/5"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function GridOverlay() {
  return (
    <Suspense fallback={null}>
      <GridOverlayInner />
    </Suspense>
  );
}
