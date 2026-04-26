import { setRequestLocale } from 'next-intl/server';
import ProjectFlipbook from '@/components/ProjectFlipbook';

export default async function FlipbookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="h-screen bg-stone-950 overflow-hidden">
      <ProjectFlipbook />
    </main>
  );
}
