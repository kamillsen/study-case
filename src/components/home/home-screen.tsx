/**
 * Sitenin ana ekranı — ana sayfada render edilen bileşen.
 * 12 grid yapısına uygun; içerik col-span-12, ileride ürün kartları col-span-4 vb. eklenebilir.
 */
export function HomeScreen() {
  return (
    <div className="col-span-12">
      <h1 className="mb-4 text-2xl font-semibold">Ana Sayfa</h1>
      <p className="text-muted-foreground">
        Ürün listesi burada gösterilecek.
      </p>
    </div>
  );
}
