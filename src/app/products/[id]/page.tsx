/**
 * Ürün detay sayfası — ara kısım içeriği.
 * Dinamik route: /products/[id]
 * İleride: useGetProductByIdQuery, görsel, açıklama, Sepete ekle butonu.
 */
type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  return (
    <>
      {/* 12 grid: başlık tam genişlik; ileride görsel col-span-5, bilgi col-span-7 vb. */}
      <div className="col-span-12">
        <h1 className="mb-4 text-2xl font-semibold">Ürün Detay</h1>
        <p className="text-muted-foreground">Ürün ID: {id}</p>
        <p className="mt-2 text-muted-foreground">
          Ürün bilgileri ve &quot;Sepete ekle&quot; burada gösterilecek.
        </p>
      </div>
    </>
  );
}
