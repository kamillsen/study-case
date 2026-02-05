'use client';

import { useParams } from 'next/navigation';
import { ProductDetailView } from '@/components/products';

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  return <ProductDetailView productId={id} />;
}
