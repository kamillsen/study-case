# Plan Adımları

Bu doküman, `doc/PROJE-PLANI.md` ile uyumlu **uygulama adımlarını** içerir. Planladıkça buraya yeni adımlar eklenir.

**Branch:** `setup/temel-bagimliliklar-ve-yapi` — bu adımlar bu branch üzerinde yapılacak.

---

## Mevcut Proje Durumu

| Var | Yok |
|-----|-----|
| Next.js 16, React 19, TypeScript, Tailwind 4, ESLint | — |
| TanStack Query, Zustand, OpenAPI Codegen, shadcn | — |
| **Sayfa bazlı bileşenler:** `src/components/home/`, `products/`, `cart/`, `profile/` | — |
| **Ortak bileşenler:** `src/components/shared/` (Header, Footer, GridOverlay) | — |
| `src/components/ui/` (shadcn), `src/app/(main)/` (route group), `src/generated/`, `src/stores/` | — |

Ana sayfa → `app/(main)/page.tsx` → `@/components/home`. Layout → `@/components/shared`. Ürün → `@/components/products`. Sepet → `@/components/cart`. Profil → `@/components/profile`.

---

## Gün 1: Proje Kurulumu ve Temel Altyapı

### Sabah (3–4 saat)

1. **Dependency kurulumu**
   - Runtime: `@tanstack/react-query`, `zustand`
   - Dev: OpenAPI React Query Codegen (paket adı repoya göre), Prettier

2. **Klasör yapısı**
   - `src/app/(main)/` — Route group (URL'de görünmez); içinde `page.tsx`, `products/`, `cart/`, `profile/`
   - `src/components/` altında: `shared/` (Header, Footer, GridOverlay), `home/`, `products/`, `cart/`, `profile/` (sayfa bazlı), `shadcn/`, `ui/`
   - `src/hooks/`, `src/lib/`, `src/generated/`, `src/stores/`, `src/types/`, `src/utils/`

3. **Environment**
   - `.env.local` oluştur; `NEXT_PUBLIC_API_BASE_URL` (örn. `https://fakestoreapi.com`)

4. **OpenAPI spec**
   - Kök dizindeki `docs-data.json` codegen girdisi olarak kullanılacak.

### Öğleden Sonra (3–4 saat)

1. **OpenAPI React Query Codegen**
   - Codegen kurulumu; config’de girdi: `docs-data.json`, çıktı: `src/generated/`
   - Script çalıştır; API client + TanStack Query hook’ları üretilsin.

2. **Tipler**
   - Ürün/API tipleri: codegen çıktısından.
   - Sepet: `types/` altında CartItem vb. (codegen’de yoksa).

3. **Tasarım sistemi**
   - Tailwind: Figma’ya göre renk / tipografi.
   - shadcn: `npx shadcn@latest init` → bileşenler `@/components/shadcn`; uygulama bileşenleri `components/ui/` içinde shadcn’i wrap eder.

---

## Önerilen Sıra (Gün 1 adımları)

| Sıra | Adım | Çıktı |
|------|------|--------|
| 1 | Runtime dependency: TanStack Query, Zustand | `package.json` güncel |
| 2 | Dev dependency: Codegen, Prettier | Kurulum tamam |
| 3 | Klasörleri oluştur (app/(main), components/shared, home, products, cart, profile, shadcn, ui; hooks, lib, generated, stores, types, utils) | Plandaki yapı |
| 4 | `.env.local` + `NEXT_PUBLIC_API_BASE_URL` | Ortam değişkeni hazır |
| 5 | Codegen config + `docs-data.json` → `src/generated/` | API client + query hook’ları |
| 6 | `npx shadcn@latest init` → `@/components/shadcn` | shadcn hazır |
| 7 | Tailwind’de Figma renkleri / base styles | Tasarım sistemi başlangıcı |
| 8 | `types/` içinde CartItem (ve gerekirse diğer uygulama tipleri) | Sepet tipleri hazır |

Bu adımlar tamamlandığında Gün 1 hedefi karşılanır; sonrası Gün 2 (ürün listeleme ve API entegrasyonu).

---

## Gün 2: Ürün Listeleme Ekranı ve API Entegrasyonu

**Hedef:** Ana sayfa ve ürün listesinin tamamlanması.

### Sabah (3–4 saat)

1. **Ana Layout oluşturma**
   - Header/Navigation component
   - Footer component
   - Responsive grid yapısı

2. **Codegen ile üretilen API entegrasyonu**
   - TanStack Query provider setup (App Router için `providers/query-provider.tsx` vb.)
   - Codegen’in ürettiği query hook’larını kullanma (örn. ürün listesi için `useGetAllProductsQuery`)
   - Loading, error, success state’leri

3. **Product Listing component**
   - ProductCard component tasarımı
   - Grid layout (Figma’ya uygun)
   - Responsive design implementasyonu

### Öğleden Sonra (3–4 saat)

1. **State management başlangıcı**
   - Zustand store kurulumu (`stores/cart-store.ts`)
   - Cart interface ve temel fonksiyonlar

2. **Loading ve Error state’leri**
   - Skeleton loader component
   - Error boundary ve error display

3. **Routing yapılandırması**
   - Dynamic routes for product details (`app/products/[id]/page.tsx`)
   - Layout optimizasyonu

---

## Önerilen Sıra (Gün 2 adımları)

| Sıra | Adım | Çıktı |
|------|------|--------|
| 1 | TanStack Query provider (App Router) | Query’ler çalışır |
| 2 | Ana Layout (Header, Footer, grid) | Sayfa iskeleti hazır |
| 3 | Ürün listesi: codegen hook + ProductCard + grid | Ana sayfa ürün listesi |
| 4 | Loading / error state’leri (skeleton, error UI) | UX iyileşir |
| 5 | Zustand cart store + Cart interface | Sepet altyapısı hazır |
| 6 | Dynamic route: `app/products/[id]/page.tsx` | Ürün detay sayfası yolu hazır |

Bu adımlar tamamlandığında Gün 2 hedefi karşılanır; sonrası Gün 3 (ürün detay ve sepet işlevselliği).

---

## Gün 3: Ürün Detay ve Sepet İşlevselliği

**Hedef:** Ürün detay sayfasının tamamlanması ve sepet ekranının (liste, adet güncelleme, toplam) çalışır hale getirilmesi.

### Sabah (3–4 saat)

1. **Ürün detay sayfası tamamlama**
   - `useGetProductByIdQuery` ile tek ürün verisi (zaten `ProductDetailView` içinde kullanılıyor olabilir).
   - Görsel, başlık, kategori, fiyat, açıklama alanları (Figma’ya uygun).
   - "Sepete ekle" butonu → Zustand cart store’a `addToCart(product, quantity)` ile ekleme.
   - Loading skeleton ve hata durumu (geçersiz id, API hatası).

2. **Sepet sayfası UI (BasketView)**
   - Sepetteki ürün listesi: her satırda görsel, ad, birim fiyat, adet, satır toplamı.
   - Toplam tutar alanı (tüm satırların toplamı).
   - Boş sepet durumu: "Sepetiniz boş" mesajı ve alışverişe dönüş linki.

3. **Zustand sepet store genişletme**
   - `cart-store.ts`: `addToCart` dışında `removeFromCart(id)`, `updateQuantity(id, quantity)` (veya `setItemQuantity`).
   - Store yapısı: sepet öğeleri listesi (id, product bilgisi veya productId, quantity, birim fiyat).

### Öğleden Sonra (3–4 saat)

1. **Sepet listesi ve adet güncelleme**
   - BasketView içinde store’dan liste okuma (`useCartStore((s) => s.items)` veya benzeri).
   - Adet artır/azalt butonları veya input; değişiklikte `updateQuantity` çağrısı.
   - Ürün çıkarma butonu → `removeFromCart(productId)`.

2. **Toplam tutar hesaplama**
   - Sepet listesinden toplam tutarı hesaplayan yardımcı (store içinde getter veya component içinde).
   - Toplam alanının UI’da güncel gösterilmesi.

3. **UX ve kenar durumları**
   - Sepette 0 adet olunca ürünü listeden kaldırma veya "Sepetten çıkar" davranışı.
   - Ürün detayda "Sepete eklendi" geri bildirimi (isteğe bağlı toast veya mesaj).
   - Gerekirse `types/` içinde CartItem tipi (codegen’de yoksa).

---

## Önerilen Sıra (Gün 3 adımları)

| Sıra | Adım | Çıktı |
|------|------|--------|
| 1 | Ürün detay: useGetProductByIdQuery + UI + "Sepete ekle" → cart store | Ürün detay sayfası çalışır |
| 2 | BasketView: sepet listesi UI + toplam alanı + boş sepet durumu | Sepet sayfası görünür |
| 3 | Cart store: removeFromCart, updateQuantity (ve gerekirse CartItem tipi) | Sepet state tam |
| 4 | Sepet listesinde adet artır/azalt ve ürün çıkar | Sepet etkileşimli |
| 5 | Toplam tutar hesaplama ve gösterimi | Sepet özeti hazır |
| 6 | Kenar durumları (0 adet, geri bildirim) | UX iyileşir |

Bu adımlar tamamlandığında Gün 3 hedefi karşılanır; sonrası Gün 4 (test, polish, README vb. planlandıkça eklenebilir).

---

## Sonraki adımlar (planlandıkça eklenecek)

<!-- Gün 4, Gün 5 vb. adımlar buraya eklenecek -->
