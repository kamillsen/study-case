'use client';

import { useParams } from 'next/navigation';
import { ProductDetailView } from '@/components/products';

/**
 * Ürünler sayfası sentetik ID kullanıyor (1000, 1001, 2000…).
 * API sadece 1–20 arası ID destekliyor; URL'deki ID'yi API ID'ye çeviriyoruz.
 */
function toApiProductId(urlId: number): number {
  if (urlId >= 1000) return Math.floor(urlId / 1000);
  return urlId;
}

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const urlId = Number(params.id);
  const apiId = toApiProductId(urlId);

  return <ProductDetailView productId={apiId} />;
}
