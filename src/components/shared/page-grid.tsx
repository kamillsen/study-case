import { cn } from '@/lib/utils';

/**
 * Sayfa içeriğini layout'taki 12 grid ile hizalamak için wrapper.
 * Tüm sayfalarda ana içerik col-span-12 ile başlar; bu bileşen tek yerde kuralı toplar.
 */
export function PageGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('col-span-12', className)}>{children}</div>;
}
