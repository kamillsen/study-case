# Wibesoft Task

**E-ticaret Mağaza Uygulaması**

Next.js ile geliştirilmiş, ürün listesi, ürün detay ve sepet sayfalarına sahip örnek bir e-ticaret arayüzü.

---

## İçindekiler

- [Projenin çalıştırılması](#projenin-çalıştırılması)
- [Kullanılan teknolojiler](#kullanılan-teknolojiler)
- [Varsayımlar](#varsayımlar)
- [Bonus özellikler](#bonus-özellikler)

---

## Projenin çalıştırılması

### Gereksinimler

- **Node.js** (LTS sürümü önerilir)
- **npm**

### Adımlar

1. Bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

2. Geliştirme sunucusunu başlatın:

   ```bash
   npm run dev
   ```

   Uygulama varsayılan olarak **http://localhost:3000** adresinde açılır.

3. Production için derleyip çalıştırmak isterseniz:

   ```bash
   npm run build
   npm start
   ```

### API ve codegen (isteğe bağlı)

Ürün verisi proje içindeki mock API route üzerinden sunulur (`src/app/api/products/route.ts`).  
OpenAPI şemasından TypeScript client ve React Query hook’ları üretmek için:

```bash
npm run codegen
```

`docs-data.json` güncellendiyse bu komut `src/generated` klasöründeki tipleri ve servisleri yeniden üretir.

---

## Kullanılan teknolojiler

| Kategori      | Teknoloji |
|---------------|-----------|
| Framework     | Next.js 16 (App Router) |
| Arayüz       | React 19, TypeScript |
| Stil          | Tailwind CSS v4, tw-animate-css |
| Bileşenler    | Radix UI, Lucide React |
| Veri & cache  | TanStack React Query |
| Client state  | Redux Toolkit |
| Yardımcı      | clsx, tailwind-merge, class-variance-authority |

**Layout ve tasarım**

- Tüm sayfalarda **12 sütunlu grid** yapısı kullanılır (`grid-cols-12`, `col-span-12`).
- Renk, tipografi ve boşluklar **design tokens** ile yönetilir (`globals.css` içinde CSS değişkenleri ve `.heading-page`, `.heading-section` gibi semantik sınıflar).

---

## Varsayımlar

- **Veri kaynağı:** Ürün verisi harici bir backend’e bağlı değildir; proje içindeki API route kullanılır.
- **Liste sayfası:** API az sayıda kayıt döndürdüğü için liste, 96 ürüne kadar tekrarlanarak genişletilir (sentetik ID ile). Bu yalnızca arayüz/demo amaçlıdır.
- **Ürün detay:** URL’deki ürün id’si bazen sentetiktir (örn. 1001, 2003). API 1–20 arası id kabul ettiği için `toApiProductId` ile dönüşüm yapılır.
- **Sepet:** Sadece client-side (Redux) tutulur; sayfa yenilendiğinde sıfırlanır, kalıcı depolama yoktur.
- **Tasarım referansı:** `doc/` klasöründeki metin mockup’ları (örn. `basket.txt`, `home.txt`) tasarım rehberi olarak kullanılmıştır.

---

## Bonus özellikler

**Merkezi state ve API**

- React Query tüm ürün verisi ve cache için kullanılır; Redux yalnızca sepet için.
- Varsayılan query ayarları (staleTime, retry) tek yerden yönetilir (QueryProvider).

**Sayfa yapısı**

- Ana sayfa, ürün listesi, sepet ve ürün detay içerikleri ilgili route dosyalarında (`app/(main)/...`) toplanmıştır; ortak parçalar `components/` altındadır.

**Ürün listesi**

- Sabitler, filtre ve sıralama mantığı `features/products/` altında (constants, types, filter-sort, utils).
- Sayfa verisi ve state `useProductsPageData` hook’unda toplanır.

**Pagination**

- Merkezi `usePagination` hook’u ve `PaginationBar` bileşeni; sayfa numaraları ve ellipsis mantığı tek yerde.

**Redux**

- Sepet aksiyonları için PayloadAction tipleri kullanılır.
- `createSelector` ile memoize edilmiş selectors: `selectCartCount`, `selectCartSubtotal`.

**Tasarım**

- Design tokens ile renk, tipografi ve spacing tek dosyadan güncellenebilir.
- Footer’da newsletter alanı; üst bölüm beyaz, alt bölüm `#F0F0F0` olacak şekilde iki bölümlü yapı.

**Geliştirme**

- URL’de `?grid=1` parametresi ile 12 sütunlu grid çizgileri gösterilir.
