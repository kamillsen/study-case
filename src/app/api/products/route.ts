import { NextRequest, NextResponse } from 'next/server';

const FAKE_STORE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://fakestoreapi.com';

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get('page')) || 1);
    const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit')) || 10));
    const category = searchParams.get('category') || '';
    const priceMin = searchParams.has('priceMin') ? Number(searchParams.get('priceMin')) : null;
    const priceMax = searchParams.has('priceMax') ? Number(searchParams.get('priceMax')) : null;
    const sort = searchParams.get('sort') || 'popular';

    const url = category
      ? `${FAKE_STORE_URL}/products/category/${encodeURIComponent(category)}`
      : `${FAKE_STORE_URL}/products`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Products fetch failed');
    let data: Product[] = await res.json();

    if (!category && data.length === 0) {
      const allRes = await fetch(`${FAKE_STORE_URL}/products`, { next: { revalidate: 60 } });
      if (allRes.ok) data = await allRes.json();
    }

    if (priceMin != null && !Number.isNaN(priceMin)) {
      data = data.filter((p) => p.price >= priceMin);
    }
    if (priceMax != null && !Number.isNaN(priceMax)) {
      data = data.filter((p) => p.price <= priceMax);
    }

    switch (sort) {
      case 'price-asc':
        data.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        data.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        data.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    const total = data.length;
    const start = (page - 1) * limit;
    const pageData = data.slice(start, start + limit);
    const catRes = await fetch(`${FAKE_STORE_URL}/products/categories`, { next: { revalidate: 300 } });
    const categories: string[] = catRes.ok ? await catRes.json() : [...new Set(data.map((p) => p.category).filter(Boolean))].sort();

    return NextResponse.json({ data: pageData, total, categories });
  } catch (err) {
    console.error('API products error:', err);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
