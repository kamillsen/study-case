/**
 * Profil sayfası — ara kısım içeriği.
 * Route: /profile
 */
/**
 * 12 grid: form veya kartlar col-span-6, col-span-4 vb. ayrılabilir.
 */
export default function ProfilePage() {
  return (
    <>
      <div className="col-span-12">
        <h1 className="mb-4 text-2xl font-semibold">Profil</h1>
        <p className="text-muted-foreground">
          Profil bilgileri burada gösterilecek.
        </p>
      </div>
    </>
  );
}
