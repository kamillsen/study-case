'use client';

import { useState } from 'react';
import { ChevronDown, SlidersHorizontal, Star } from 'lucide-react';
import type { Product } from '@/generated/queries';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ProductDetailTabsProps = {
  product: Product;
};

type TabId = 'details' | 'reviews' | 'faqs';

type Review = {
  author: string;
  rating: number;
  text: string;
  date: string;
};

const MOCK_REVIEWS: Review[] = [
  {
    author: 'Samantha D.',
    rating: 5,
    text: 'I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable.',
    date: 'August 14, 2023',
  },
  {
    author: 'Alex M.',
    rating: 5,
    text: 'The t-shirt exceeded my expectations! The colors are vibrant and the print quality is great.',
    date: 'August 15, 2023',
  },
  {
    author: 'Ethan R.',
    rating: 4,
    text: 'This t-shirt is a must-have for anyone who appreciates good design. The minimalist pattern is stylish.',
    date: 'August 16, 2023',
  },
  {
    author: 'Olivia P.',
    rating: 5,
    text: 'As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt delivers both.',
    date: 'August 17, 2023',
  },
  {
    author: 'Jordan K.',
    rating: 5,
    text: 'Perfect fit and quality. Will definitely order again in other colors.',
    date: 'August 18, 2023',
  },
  {
    author: 'Morgan L.',
    rating: 4,
    text: 'Great product, fast shipping. Only minor issue was sizing — consider going one size up.',
    date: 'August 19, 2023',
  },
  {
    author: 'Taylor S.',
    rating: 5,
    text: 'Exactly as described. Comfortable and stylish. Highly recommend!',
    date: 'August 20, 2023',
  },
  {
    author: 'Casey J.',
    rating: 4,
    text: 'Really happy with the purchase. The material is soft and holds up well after washing.',
    date: 'August 21, 2023',
  },
  {
    author: 'Riley M.',
    rating: 5,
    text: 'Best t-shirt I have bought online. Will be ordering more for sure.',
    date: 'August 22, 2023',
  },
  {
    author: 'Quinn A.',
    rating: 4,
    text: 'Good value for money. Sizing was accurate. Delivery was fast.',
    date: 'August 23, 2023',
  },
];

const TABS: { id: TabId; label: string }[] = [
  { id: 'details', label: 'Product Details' },
  { id: 'reviews', label: 'Rating & Reviews' },
  { id: 'faqs', label: 'FAQ' },
];

const REVIEWS_PER_LOAD = 2;
const INITIAL_REVIEWS_COUNT = 4;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} yıldız`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`size-4 ${
            i < rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  );
}

const TOTAL_REVIEWS_COUNT = 451; // mock toplam (product.txt)

export function ProductDetailTabs({ product }: ProductDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('details');
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(INITIAL_REVIEWS_COUNT);
  const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');
  const [filterOpen, setFilterOpen] = useState(false);

  const visibleReviewsRaw = MOCK_REVIEWS.slice(0, visibleReviewsCount);
  const visibleReviews =
    sortBy === 'latest' ? visibleReviewsRaw : [...visibleReviewsRaw].reverse();
  const hasMoreReviews = visibleReviewsCount < MOCK_REVIEWS.length;

  const handleLoadMoreReviews = () => {
    setVisibleReviewsCount((n) => Math.min(n + REVIEWS_PER_LOAD, MOCK_REVIEWS.length));
  };

  return (
    <section className="mt-10 border-t border-border pt-8" aria-label="Ürün detay sekmeleri">
      {/* Tab başlıkları — ekranı 3 eşit bölüme ayırır, altında tek çizgi, aktifte kalın */}
      <div className="grid grid-cols-3 border-b border-border" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center justify-center border-b-2 py-4 text-base font-medium transition-colors -mb-px md:text-lg',
              activeTab === tab.id
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab içerikleri */}
      <div className="mt-6" role="tabpanel">
        {activeTab === 'details' && (
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="leading-relaxed">{product.description}</p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="flex flex-col gap-6">
            {/* All Reviews (451) — Filter, Sort, Write */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-base font-semibold text-foreground md:text-lg">
                All Reviews ({TOTAL_REVIEWS_COUNT})
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full bg-muted/80 hover:bg-muted"
                  onClick={() => setFilterOpen((o) => !o)}
                  aria-expanded={filterOpen}
                  aria-label="Filter"
                >
                  <SlidersHorizontal className="size-4" aria-hidden />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="min-w-28 rounded-full px-5"
                  onClick={() => setSortBy((s) => (s === 'latest' ? 'oldest' : 'latest'))}
                  aria-haspopup="listbox"
                  aria-label="Sırala"
                >
                  {sortBy === 'latest' ? 'Latest' : 'Oldest'}
                  <ChevronDown className="ml-1.5 size-4" aria-hidden />
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="min-w-36 rounded-full bg-foreground px-5 text-background hover:bg-foreground/90"
                >
                  Write a Review
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {visibleReviews.map((review, i) => (
                <div
                  key={`${review.author}-${i}`}
                  className="rounded-lg border border-border bg-card p-4"
                >
                  <div className="mb-2 flex flex-col gap-1">
                    <StarRating rating={review.rating} />
                    <span className="text-sm font-medium text-foreground">
                      {review.author} <span className="text-primary">✔</span>
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground">&ldquo;{review.text}&rdquo;</p>
                  <p className="text-xs text-muted-foreground">Posted on {review.date}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                className="rounded-full px-8"
                onClick={handleLoadMoreReviews}
                disabled={!hasMoreReviews}
              >
                Load More Reviews
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="rounded-lg border border-border bg-muted/30 p-6 text-center text-muted-foreground">
            <p className="text-sm">SSS içeriği yakında eklenecek.</p>
          </div>
        )}
      </div>
    </section>
  );
}
