"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Star,
} from "lucide-react";

/** Değiştirmek için: yeni yorum ekleyip çıkarabilirsiniz. */
const REVIEWS = [
  {
    id: "1",
    author: "Jane D.",
    text: "Amazing quality and fast shipping. Will definitely order again!",
    rating: 5,
  },
  {
    id: "2",
    author: "John S.",
    text: "Great selection and the clothes fit perfectly. Very happy with my purchase.",
    rating: 5,
  },
  {
    id: "3",
    author: "Maria L.",
    text: "Love the style and comfort. The customer service was excellent.",
    rating: 5,
  },
] as const;

/** Başlık metni — kolayca değiştirilebilir. */
const SECTION_HEADING = "Happy Customers / Testimonials";

function ReviewCard({
  author,
  text,
  rating,
}: {
  author: string;
  text: string;
  rating: number;
}) {
  return (
    <article className="flex min-h-[160px] flex-col rounded-lg border border-border bg-card p-5 shadow-sm md:min-h-[180px] md:p-6">
      {/* Yıldızlar — sarı, kartın sol üstü */}
      <div className="mb-3 flex gap-0.5" aria-label={`${rating} yıldız`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`size-4 md:size-5 ${i < rating ? "fill-amber-400 text-amber-400" : "fill-transparent text-muted-foreground/30"}`}
            aria-hidden
          />
        ))}
      </div>
      {/* Kullanıcı adı — yanında yeşil daire içinde beyaz tik */}
      <div className="mb-2 flex items-center gap-2">
        <span className="font-medium text-foreground">{author}</span>
        <span
          className="flex size-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-white"
          aria-label="Doğrulanmış"
        >
          <Check className="size-3 stroke-[2.5]" aria-hidden />
        </span>
      </div>
      {/* İçerik — kullanıcı adının altında */}
      <p className="flex-1 text-sm text-muted-foreground md:text-base">
        &ldquo;{text}&rdquo;
      </p>
    </article>
  );
}

/**
 * Happy Customers / Testimonials — 3 review kartı ve slider okları.
 * İçerik REVIEWS ve SECTION_HEADING ile kolayca değiştirilebilir.
 * Slider okları ileride carousel için kullanılabilir.
 */
export function TestimonialsSection() {
  const goPrev = () => {
    /* İleride: önceki slide / kart seti */
  };
  const goNext = () => {
    /* İleride: sonraki slide / kart seti */
  };

  return (
    <section
      className="col-span-12 mt-12 flex flex-col gap-8 px-10 md:mt-16 md:px-12"
      aria-labelledby="testimonials-heading"
    >
      {/* Başlık ve ileri/geri butonları — altındaki kart gridinin solu ile tam aynı hizadan başlar */}
      <div className="grid grid-cols-12 gap-10 md:gap-12">
        <div className="col-span-1 hidden sm:block" aria-hidden />
        <div className="col-span-12 flex flex-wrap items-center justify-between gap-4 sm:col-span-10 sm:-ml-10 sm:-mr-10 md:-ml-12 md:-mr-12">
          <h2
            id="testimonials-heading"
            className="text-left text-2xl font-bold uppercase tracking-wide text-foreground md:text-3xl"
          >
            {SECTION_HEADING}
          </h2>
          <div className="flex items-center gap-2" aria-label="Slider navigation">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Önceki yorum"
              className="p-1 text-foreground hover:text-foreground/80 focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Sonraki yorum"
              className="p-1 text-foreground hover:text-foreground/80 focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowRight className="size-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-10 md:gap-12">
        <div className="col-span-1 hidden sm:block" aria-hidden />
        <div className="col-span-12 grid grid-cols-1 gap-6 sm:col-span-10 sm:-ml-10 sm:-mr-10 sm:grid-cols-3 md:gap-8 md:-ml-12 md:-mr-12">
          {REVIEWS.map((review) => (
            <ReviewCard
              key={review.id}
              author={review.author}
              text={review.text}
              rating={review.rating}
            />
          ))}
        </div>
        <div className="col-span-1 hidden sm:block" aria-hidden />
      </div>
    </section>
  );
}
