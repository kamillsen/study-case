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

Bu adımlar tamamlandığında Gün 3 hedefi karşılanır; sonrası Ürünler ekranı (Shop/Casual sayfası).

---

## Ürünler Ekranı (Shop / Casual — producst.txt)

**Hedef:** `/products` sayfasında filtre paneli, ürün grid’i, sıralama ve sayfalama ile producst.txt’deki ekranın tamamlanması.

**Referans:** `doc/producst.txt` — breadcrumb, sol filtre paneli, sağda kategori başlığı + “Showing X–Y of Z” + Sort + 3 sütun ürün grid’i, pagination, newsletter, footer.

### Sabah (3–4 saat)

1. **Breadcrumb ve sayfa iskeleti**
   - Breadcrumb: Home > Shop (veya Home > Casual / kategori adı); `products/page.tsx` veya ortak bileşen.
   - İki sütun layout: sol (filtre paneli), sağ (başlık + “Showing…” + Sort + grid).

2. **Sol panel — Filtre kutusu**
   - “Filters” başlığı + [≡] ikonu (mobilde paneli aç/kapa; masaüstünde sabit).
   - Kategori listesi: T-shirts, Shorts, Shirts, Hoodie, Jeans (her biri `>` ile; link veya filtre).
   - Fiyat aralığı: “Price” + slider veya iki input ($50–$200).
   - Renkler: “Colors” + renk daireleri (●).
   - Beden: “Size” — XS, S, M, L, XL, XXL (checkbox/buton).
   - Dress Style: Casual, Formal, Party, Gym (her biri `>`).
   - [ Apply Filter ] butonu.

3. **Sağ alan — Başlık ve kontroller**
   - Kategori başlığı (örn. “Casual”).
   - “Showing 1–10 of 100” (veya toplam ürün sayısı).
   - “Sort by: Most Popular ▼” dropdown (Most Popular, Price Low–High, Price High–Low, Newest vb.).

### Öğleden Sonra (3–4 saat)

1. **Ürün grid’i ve filtreleme**
   - Mevcut `ProductGridCard` ile 3 sütun grid (lg:grid-cols-3).
   - Client-side filtre: kategori (API `category`), fiyat min/max; renk/beden/dress style API’de yoksa mock veya sonra bağlanır.
   - Sort: seçilen sıralamaya göre listeyi sırala.

2. **Pagination**
   - “← Previous” ve “Next →” butonları.
   - Sayfa numaraları: 1, 2, 3, …, 8, 9, 10 (veya toplam sayfa sayısına göre).
   - Sayfa başına 10 (veya 12) ürün; “Showing X–Y of Z” ile uyumlu.

3. **Responsive ve navigasyon**
   - Mobilde filtre paneli: Sheet/Drawer (Filters [≡] ile açılır).
   - Header Shop menüsünde “Tüm ürünler” → `/products`.
   - Ana sayfa New Arrivals / Top Selling “View All” → `/products`.

---

## Önerilen Sıra (Ürünler ekranı adımları)

| Sıra | Adım | Çıktı |
|------|------|--------|
| 1 | Breadcrumb (Home > Shop / Casual) + 2 sütun layout (sol filtre, sağ içerik) | Sayfa iskeleti hazır |
| 2 | Sol panel: Filters başlığı + [≡], kategori listesi (T-shirts, Shorts, …), Price, Colors, Size, Dress Style, Apply Filter | Filtre UI hazır |
| 3 | Sağ üst: Kategori başlığı + “Showing X–Y of Z” + Sort by dropdown | Kontroller hazır |
| 4 | Ürün grid’i (ProductGridCard, 3 sütun) + client-side filtre (kategori, fiyat) + sort | Liste çalışır |
| 5 | Pagination (Previous, sayfa numaraları, Next) + “Showing” ile uyumlu | Sayfalama çalışır |
| 6 | Mobilde filtre paneli Sheet/Drawer; Header Shop → “Tüm ürünler” + View All → `/products` | Navigasyon ve responsive tamam |

Bu adımlar tamamlandığında Ürünler ekranı (producst.txt) karşılanır; sonrası Gün 4 (test, polish, README vb.) planlandıkça eklenebilir.

---

## Sepet Sayfası (Cart — basket.txt)

**Hedef:** `/basket` sayfasında `doc/basket.txt` tasarımına uygun sepet ekranı: sol tarafta ürün listesi (görsel, ad, beden/renk, fiyat, adet ±, çöp), sağ tarafta Order Summary (subtotal, indirim, kargo, toplam, promo code, checkout).

**Referans:** `doc/basket.txt` — breadcrumb (Home > Cart), YOUR CART başlığı, 2 sütun layout (sol: sepet kalemleri, sağ: Order Summary), her kalemde görsel + başlık + Size/Color + fiyat + [−] adet [+] + çöp ikonu; sağda Subtotal, Discount (-20%), Delivery Fee, Total, promo code alanı + Apply, “Go to Checkout →” butonu; sayfa altında newsletter, sonra footer.

### Sabah (3–4 saat)

1. **Breadcrumb ve sayfa iskeleti**
   - Breadcrumb: Home > Cart (link + mevcut sayfa).
   - Ana başlık: “YOUR CART”.
   - İki sütun layout: sol (sepet listesi, geniş), sağ (Order Summary, sabit genişlik veya max-width).

2. **Sol panel — Sepet kalemleri (CartItem)**
   - Her satır: ürün görseli (Image), ürün adı (title), Size: … / Color: … (store’da yoksa mock veya opsiyonel alan), birim fiyat ($…).
   - Adet: [ − ] sayı [ + ] butonları → `increment(productId)` / `decrement(productId)` (mevcut cart-store).
   - Çöp ikonu → `removeFromCart(productId)`.
   - Kalemler arası ayırıcı çizgi (border veya hr).
   - Veri: `useCartStore((s) => s.items)`; her item: `product` (id, title, price, image) + `quantity`.

3. **Boş sepet durumu**
   - Sepette ürün yoksa: “Sepetiniz boş” (veya benzeri) mesajı + “Alışverişe dön” / “Shop Now” linki (`/products` veya `/`).

### Öğleden Sonra (3–4 saat)

1. **Sağ panel — Order Summary**
   - Kutu: başlık “Order Summary”.
   - Subtotal: sepetteki tüm kalemlerin (price × quantity) toplamı.
   - Discount (-20%): isteğe bağlı; sabit yüzde veya promo’ya göre (ilk aşamada sabit -20% veya 0).
   - Delivery Fee: sabit (örn. $15) veya ücretsiz kargo eşiği.
   - Çizgi, sonra Total.
   - “Add promo code” input + [Apply] butonu (isteğe bağlı; başta disabled veya mock).
   - “Go to Checkout →” butonu (primary; checkout sayfası yoksa `#` veya disabled + tooltip).

2. **Toplam hesaplama**
   - Subtotal: store’daki `items` üzerinden `item.product.price * item.quantity` toplamı.
   - Discount / Delivery / Total: seçilen kurala göre (örn. Total = Subtotal − Discount + Delivery).

3. **Responsive**
   - Mobilde: sepet listesi üstte, Order Summary altta (tek sütun) veya sabit alt özet kutusu.
   - Masaüstü: sol ~2/3, sağ ~1/3 veya grid-cols-1 lg:grid-cols-3 gibi.

4. **Newsletter ve sayfa sonu**
   - Sepet içeriğinin altında mevcut `NewsletterSection` (varsa) kullanılır; sonra footer (layout’tan geliyorsa ekstra iş yok).

---

## Önerilen Sıra (Sepet sayfası adımları)

| Sıra | Adım | Çıktı |
|------|------|--------|
| 1 | Breadcrumb (Home > Cart) + “YOUR CART” başlığı + 2 sütun layout (sol liste, sağ özet) | Sepet sayfa iskeleti |
| 2 | CartItem bileşeni: görsel, başlık, Size/Color (mock), fiyat, [−] adet [+], çöp ikonu; store’dan items oku | Sepet listesi görünür |
| 3 | Boş sepet: mesaj + “Alışverişe dön” linki | Boş sepet UX |
| 4 | Order Summary: Subtotal, Discount (-20%), Delivery Fee, Total hesaplama ve gösterimi | Özet kutusu hazır |
| 5 | Promo code alanı (mock/optional) + “Go to Checkout →” butonu | Checkout’a hazırlık |
| 6 | Responsive: mobilde tek sütun / özet altta; newsletter + footer | Sepet sayfası basket.txt ile uyumlu |

Bu adımlar tamamlandığında Sepet sayfası (basket.txt) karşılanır; sonrası Gün 4 (test, polish, README) veya Checkout sayfası planlanabilir.

---

## Sonraki adımlar (planlandıkça eklenecek)

<!-- Gün 4, Checkout, Profil vb. adımlar buraya eklenecek -->
