# Plan Adımları

Bu doküman, `doc/PROJE-PLANI.md` ile uyumlu **uygulama adımlarını** içerir. Planladıkça buraya yeni adımlar eklenir.

**Branch:** `setup/temel-bagimliliklar-ve-yapi` — bu adımlar bu branch üzerinde yapılacak.

---

## Mevcut Proje Durumu

| Var | Yok |
|-----|-----|
| Next.js 16, React 19, TypeScript, Tailwind 4, ESLint | TanStack Query, Zustand, OpenAPI Codegen, shadcn |
| `src/app/` (layout, page, globals.css) | `components/`, `hooks/`, `lib/`, `generated/`, `stores/`, `types/`, `utils/` |
| Kök dizinde `docs-data.json` (OpenAPI spec) | `.env.local`, codegen config |

Temel Next.js projesi hazır; plandaki stack ve klasör yapısı henüz eklenmedi.

---

## Gün 1: Proje Kurulumu ve Temel Altyapı

### Sabah (3–4 saat)

1. **Dependency kurulumu**
   - Runtime: `@tanstack/react-query`, `zustand`
   - Dev: OpenAPI React Query Codegen (paket adı repoya göre), Prettier

2. **Klasör yapısı**
   - `src/components/` altında: `shadcn/`, `ui/`, `products/`, `cart/`
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
| 3 | Klasörleri oluştur (components/shadcn, ui, products, cart; hooks, lib, generated, stores, types, utils) | Plandaki yapı |
| 4 | `.env.local` + `NEXT_PUBLIC_API_BASE_URL` | Ortam değişkeni hazır |
| 5 | Codegen config + `docs-data.json` → `src/generated/` | API client + query hook’ları |
| 6 | `npx shadcn@latest init` → `@/components/shadcn` | shadcn hazır |
| 7 | Tailwind’de Figma renkleri / base styles | Tasarım sistemi başlangıcı |
| 8 | `types/` içinde CartItem (ve gerekirse diğer uygulama tipleri) | Sepet tipleri hazır |

Bu adımlar tamamlandığında Gün 1 hedefi karşılanır; sonrası Gün 2 (ürün listeleme ve API entegrasyonu).

---

## Sonraki adımlar (planlandıkça eklenecek)

<!-- Gün 2, Gün 3 vb. adımlar buraya eklenecek -->
