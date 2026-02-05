# Frontend Teknik Değerlendirme Proje Planı

## 📋 Proje Genel Bakış
**Teknoloji Stack'i:** Next.js 14 (App Router), TypeScript, Tailwind CSS, TanStack Query v5, OpenAPI React Query Codegen, Zustand

> Bu plan, Wibesoft Frontend Teknik Değerlendirme Görevi dokümanındaki istenen ekranlar, özellikler ve kütüphanelere göre hazırlanmıştır.

---

## 📌 Resmi Görev Özeti (Wibesoft Dokümanı)

### Beklenen Ekranlar
- **Ürün Listeleme:** API'den liste, loading, hata yönetimi; ürün görseli, ad, fiyat.
- **Ürün Detay:** Görsel, açıklama, fiyat; "Sepete ekle" butonu.
- **Sepet:** Ürün listesi (ad, adet, fiyat), toplam tutar, ürün çıkarma / adet güncelleme.

### Veri Kaynağı
- https://fakestoreapi.com/docs
- https://fakestoreapi.com/docs-data (OpenAPI 3.1.0 spec — codegen için kullanılacak)

### Tasarım
- Figma: [E-commerce Website Template](https://www.figma.com/design/Zr5KLBmfZQeV0goyFG9gmy/E-commerce-Website-Template–Freebie—Community-?node-id=0-1&t=TPzT7NNxwczvmZOT-1)
- Dikkat: renk paleti, grid, boşluklar (margins/paddings), tipografi, buton stilleri. Responsive, Tailwind CSS.

### Zorunlu Kütüphaneler
- React veya **Next.js** (web)
- **TypeScript**
- **TanStack Query v5** — API, cache, asenkron veri
- **OpenAPI React Query Codegen** — API client ve query yapılarının otomatik üretimi
- **Zustand** — global state, sepet
- **Tailwind CSS**
- **Routing:** Next.js Router
- **Environment Variables (.env)**

### Teslim
- GitHub repo, README (nasıl çalıştırılır, teknolojiler, varsayımlar/bonus), düzenli commit geçmişi.

### Değerlendirme Kriterleri
Kod kalitesi, bileşen yapısı, Zustand kullanımı, API entegrasyonu, Figma uyumu, kullanıcı deneyimi.

---

## 📅 Gün Bazlı Çalışma Planı

### **Gün 1: Proje Kurulumu ve Temel Altyapı**
**Hedef:** Tüm teknolojilerin kurulumu ve temel yapının hazırlanması

#### **Sabah (3-4 saat)**
1. **Proje başlatma ve dependency kurulumu**
   - Proje aşağıdaki komutla oluşturuldu (ESLint dahil):
   ```bash
   npx create-next-app@latest wibesoft-task \
     --typescript \
     --tailwind \
     --app \
     --eslint
   ```
   - TanStack Query kurulumu
   - Zustand kurulumu
   - OpenAPI React Query Codegen kurulumu (dev dependency)
   - Prettier konfigürasyonu (ESLint zaten projede mevcut)

2. **Proje yapısının oluşturulması**
   ```
   src/
   ├── app/                    # Next.js App Router
   │   ├── (routes)/          # Route grupları
   │   ├── layout.tsx         # Root layout
   │   └── page.tsx           # Home page
   ├── components/            # Reusable components
   │   ├── shadcn/            # shadcn CLI çıktısı — dokunulmaz (kütüphane katmanı)
   │   ├── ui/                # Bizim katman: Figma’ya göre özelleştirilmiş bileşenler (shadcn’i wrap eder)
   │   ├── products/          # Product-related components
   │   └── cart/              # Cart components
   ├── hooks/                 # Custom hooks
   ├── lib/                   # Utilities, configs
   ├── generated/             # OpenAPI Codegen çıktısı (API client, query hooks)
   ├── stores/                # Zustand stores
   ├── types/                 # TypeScript definitions
   └── utils/                 # Helper functions
   ```

   **UI bileşenleri (shadcn) organizasyonu (Seçenek B):**
   - **`components/shadcn/`** — shadcn CLI bileşenleri buraya eklenir. Bu dosyalara el ile değişiklik yapılmaz; güncelleme/ekleme sadece CLI ile (`npx shadcn@latest add ...`). Init sırasında "Where should we add the components?" → `@/components/shadcn` seçilir.
   - **`components/ui/`** — Uygulama katmanı: shadcn bileşenlerini import edip Figma’ya göre stil/variant veren wrapper’lar. Tüm özelleştirmeler burada yapılır; `products/` ve `cart/` buradaki bileşenleri kullanır.
   - Örnek: `ui/button.tsx` → `@/components/shadcn/button` import eder, className/variant’ları Figma paletine göre tanımlar ve export eder.

3. **Environment variables konfigürasyonu**
   - `.env.local` dosyası oluştur
   - API base URL tanımlaması (örn. `NEXT_PUBLIC_API_BASE_URL`)

4. **OpenAPI spec hazırlığı**
   - Fake Store API OpenAPI spec: projede `docs-data.json` (https://fakestoreapi.com/docs-data) veya URL ile codegen'e verilecek.

#### **Öğleden Sonra (3-4 saat)**
1. **OpenAPI React Query Codegen kurulumu ve çalıştırılması**
   - [openapi-react-query-codegen](https://github.com/7nohe/openapi-react-query-codegen) ile API client ve TanStack Query hook'larının otomatik üretimi.
   - Girdi: `docs-data.json` (veya `https://fakestoreapi.com/docs-data`).
   - Çıktı: `src/generated/` (veya proje yapısına uygun klasör) — API client, query/mutation hook'ları, tipler.
   - Codegen config (ör. `openapi-codegen.config.ts` veya package.json script) tanımlanması.

2. **TypeScript tiplerinin tanımlanması**
   - Product/API tipleri codegen çıktısından gelecek.
   - Sadece uygulama özelinde: CartItem, sepet ile ilgili tipler (gerekirse `types/` altında).

3. **Tasarım sistemi başlangıcı**
   - Tailwind config güncelleme (Figma'daki renkler)
   - Base styles ve typography
   - shadcn/ui: `npx shadcn@latest init` → bileşenler `@/components/shadcn`; uygulama bileşenleri `components/ui/` içinde shadcn’i wrap ederek Figma’ya göre kullanılır.

---

### **Gün 2: Ürün Listeleme Ekranı ve API Entegrasyonu**
**Hedef:** Ana sayfa ve ürün listesinin tamamlanması

#### **Sabah (3-4 saat)**
1. **Ana Layout oluşturma**
   - Header/Navigation component
   - Footer component
   - Responsive grid yapısı

2. **Codegen ile üretilen API entegrasyonu**
   - TanStack Query provider setup (App Router için `providers/query-provider.tsx` vb.)
   - Codegen'in ürettiği query hook'larını kullanma (örn. ürün listesi için üretilen hook)
   - Loading, error, success state'leri

3. **Product Listing component**
   - ProductCard component tasarımı
   - Grid layout (Figma'ya uygun)
   - Responsive design implementasyonu

#### **Öğleden Sonra (3-4 saat)**
1. **State management başlangıcı**
   - Zustand store kurulumu (`stores/cart-store.ts`)
   - Cart interface ve temel fonksiyonlar

2. **Loading ve Error state'leri**
   - Skeleton loader component
   - Error boundary ve error display

3. **Routing yapılandırması**
   - Dynamic routes for product details (`app/products/[id]/page.tsx`)
   - Layout optimizasyonu

---

### **Gün 3: Ürün Detay ve Sepet İşlevselliği**
**Hedef:** Ürün detay sayfası ve sepet temel işlevleri

#### **Sabah (3-4 saat)**
1. **Product Detail sayfası**
   - Dynamic route implementasyonu (`app/products/[id]/page.tsx`)
   - Codegen'den gelen tek ürün query hook'u kullanımı
   - Product images gallery
   - "Sepete Ekle" butonu

2. **Cart Store geliştirme**
   - Add to cart fonksiyonu
   - Remove from cart
   - Update quantity
   - Calculate total price

#### **Öğleden Sonra (3-4 saat)**
1. **Cart Page implementasyonu**
   - Cart layout (Figma'ya uygun)
   - CartItem component
   - Quantity selector component
   - Total price calculation

2. **UI/UX iyileştirmeleri**
   - Toast veya basit bildirim (isteğe bağlı)
   - Button states (loading, disabled)

---

### **Gün 4: Polish, Testing ve Deployment**
**Hedef:** Son dokunuşlar ve teslim hazırlığı

#### **Sabah (3-4 saat)**
1. **Responsive design finalize**
   - Mobile-first approach kontrolü
   - Breakpoint testleri
   - Cross-browser testing

2. **Performance optimizasyonları**
   - Image optimization (Next.js Image)
   - Code splitting
   - Bundle size analizi

3. **Error handling geliştirme**
   - API error handling improvements
   - Fallback UI'lar
   - Network status handling

#### **Öğleden Sonra (3-4 saat)**
1. **Code quality kontrolü**
   - ESLint/Prettier fix
   - TypeScript strict mode kontrol
   - Comment ve documentation

2. **Git ve README hazırlığı**
   - Clean commit history
   - Comprehensive README.md
   - Environment setup instructions

3. **Bonus özellikler (zaman kalırsa)**
   - Search functionality
   - Product filtering
   - Persisted cart (localStorage)

---

## 🏗️ Mimari Katmanlar ve Amaçları

### **1. Presentation Layer (UI Components)**
- **Ne işe yarar:** Kullanıcı arayüzünü oluşturan bileşenler
- **Neden kullanılır:** Reusability, maintainability, separation of concerns
- **Örnek:** `ProductCard`, `Header`, `CartItem`
- **Dikkat edilecekler:** Stateless olmaya özen göster, props interface'leri clear olsun

### **2. Business Logic Layer (Custom Hooks)**
- **Ne işe yarar:** İş mantığını component'lerden ayırır
- **Neden kullanılır:** Logic reuse, testability, clean components
- **Örnek:** `useProducts`, `useCart`, `useProductDetail`
- **Dikkat edilecekler:** Her hook tek bir sorumluluk taşımalı

### **3. API Katmanı (OpenAPI Codegen + TanStack Query)**
- **Ne işe yarar:** API client ve TanStack Query hook'larının otomatik üretimi; backend ile tip güvenli iletişim
- **Neden kullanılır:** Spec-driven development, tutarlı tipler, bakım kolaylığı (Wibesoft dokümanında zorunlu)
- **Örnek:** Codegen çıktısından gelen query hook'ları (örn. ürün listesi, tek ürün detayı)
- **Dikkat edilecekler:** `docs-data.json` (Fake Store API OpenAPI spec) güncel tutulmalı; codegen script'i build/ci'da çalıştırılabilir

### **4. State Management Layer (Zustand Stores)**
- **Ne işe yarar:** Global state yönetimi
- **Neden kullanılır:** Prop drilling önler, predictable state
- **Örnek:** `cartStore` - sepetteki ürünler, toplam tutar
- **Dikkat edilecekler:** Store'ları küçük ve focused tut, devtools aktif et

### **5. Data Fetching Layer (TanStack Query + Codegen)**
- **Ne işe yarar:** Server state yönetimi, caching, synchronization; hook'lar codegen ile üretilir
- **Neden kullanılır:** Automatic caching, background updates, error retries; API ile uyumlu tipler
- **Örnek:** Codegen'in ürettiği `useGetProducts`, `useGetProductById` vb. hook'lar
- **Dikkat edilecekler:** Query keys codegen tarafından yönetilir; stale time gerekirse override edilebilir

---

## 🔧 Teknolojiler ve Kullanım Amaçları

### **Next.js 14 (App Router)**
- **Amaç:** Framework, routing, SSR/SSG, optimization
- **Neden:** File-based routing, server components, built-in optimizations
- **Kısa örnek:** `app/products/[id]/page.tsx` otomatik dynamic route

### **TypeScript**
- **Amaç:** Type safety, better developer experience
- **Neden:** Catch errors at compile time, self-documenting code
- **Kısa örnek:**
```typescript
interface Product {
  id: number;
  title: string;
  price: number;
}
```

### **TanStack Query v5**
- **Amaç:** Server state management, caching, background sync
- **Neden:** Automatic cache invalidation, optimistic updates
- **Kısa örnek:**
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts
});
```

### **Zustand**
- **Amaç:** Client state management (sepet)
- **Neden:** Simple API, minimal boilerplate, TypeScript support
- **Kısa örnek:**
```typescript
const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (product) => set((state) => ({...})),
}));
```

### **Tailwind CSS**
- **Amaç:** UI geliştirme ve stil yönetimi (dokümanda zorunlu)
- **Neden:** Rapid UI development, Figma ile tutarlı spacing/renk/tipografi
- **Kısa örnek:** `className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"`

### **OpenAPI React Query Codegen**
- **Amaç:** API client ve TanStack Query yapılarını OpenAPI spec'ten otomatik üretmek (dokümanda zorunlu)
- **Neden:** Tip güvenliği, spec ile senkron API kullanımı, bakım kolaylığı
- **Kaynak:** [openapi-react-query-codegen](https://github.com/7nohe/openapi-react-query-codegen)
- **Girdi:** Fake Store API spec — `docs-data.json` veya `https://fakestoreapi.com/docs-data`

---

## 🎯 Kritik Başarı Faktörleri

### **Dokümana Uyum:**
1. Zorunlu kütüphaneler: Next.js, TypeScript, TanStack Query v5, OpenAPI React Query Codegen, Zustand, Tailwind, .env ✓
2. Figma tasarımına görsel uyum (layout, renk paleti, tipografi, boşluklar) ✓
3. TypeScript strict mode aktif ✓
4. API: Codegen ile üretilen client/hook'lar + TanStack Query ✓
5. Zustand ile sepet state'i ✓
6. README: çalıştırma, teknolojiler, varsayımlar/bonus ✓

### **Kod Kalitesi:**
- ESLint/Prettier konfigüre edilmiş
- Component'ler küçük ve single responsibility
- TypeScript strict mode ile geliştirme
- Clean commit history

### **Kullanıcı Deneyimi:**
- Loading states (skeleton loader)
- Error boundaries ve user-friendly error messages
- Responsive design (mobile-first)
- Accessible HTML semantik

### **Teslim Hazırlığı:**
- README.md tam ve açıklayıcı
- Environment variables documented
- Proje kolayca çalıştırılabilir durumda
- Bonus özellikler belirtilmiş

---

## ⚠️ Dikkat Edilmesi Gerekenler

1. **Time management:** Her gün hedeflenen kısmı bitirmeye çalış
2. **MVP first:** Önce temel özellikler, sonra bonuslar
3. **Commit frequently:** Her feature sonrası commit
4. **Test as you go:** Her component yazdıktan sonra test et
5. **Ask AI strategically:** Spesifik sorular sor, genel sorular sorma
6. **Document decisions:** README'de teknik kararları açıkla

---

## 🚀 Başlangıç Komutları (Gün 1 için)

Proje aşağıdaki komutla oluşturuldu (ESLint dahil):

```bash
npx create-next-app@latest wibesoft-task \
  --typescript \
  --tailwind \
  --app \
  --eslint
```

**Eklenecek dependencies:**

```bash
# Runtime dependencies (Wibesoft dokümanına uygun)
npm install @tanstack/react-query zustand

# Dev dependencies — OpenAPI React Query Codegen + Prettier
npm install -D openapi-react-query-codegen prettier
# Not: Codegen paket adı 7nohe reposundaki güncel isme göre güncellenmeli (örn. @7nohe/openapi-react-query-codegen vb.)
```

**Codegen için:** Spec olarak projedeki `docs-data.json` (Fake Store API OpenAPI 3.1.0) kullanılacak. Codegen config ve çıktı klasörü (örn. `src/generated/`) proje yapısına göre ayarlanmalı.

Bu planı takip ederek hem zamanında bitirebilirsin hem de Wibesoft teknik değerlendirme dokümanındaki tüm gereksinimleri karşılayan bir proje teslim edebilirsin. OpenAPI React Query Codegen kurulumu için ilgili repo dokümantasyonuna ve örnek config'e bak.
