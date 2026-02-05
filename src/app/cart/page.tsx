/**
 * Sepet sayfası — ara kısım içeriği. Route: /cart
 * 12 grid: liste col-span-8, özet col-span-4 vb. ayarlanabilir.
 * İleride: Zustand cart store, CartItem listesi, adet güncelleme, toplam tutar.
 */
export default function CartPage() {
  return (
    <>
      <div className="col-span-12">
        <h1 className="mb-4 text-2xl font-semibold">Sepet</h1>
        <p className="text-muted-foreground">
          Sepetteki ürünler, adet ve toplam tutar burada gösterilecek.
        </p>
      </div>
    </>
  );
}
