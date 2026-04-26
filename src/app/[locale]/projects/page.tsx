import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProjectsGrid from '@/components/ProjectsGrid';

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('projects');

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="pt-28 md:pt-40 pb-8 md:pb-12 px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-3">Portfolio</p>
          <h1 className="text-4xl md:text-7xl font-light text-black tracking-tight">{t('title')}</h1>
        </div>
        <Link
          href={`/${locale}/projects/flipbook`}
          className="group inline-flex items-center gap-3 border border-stone-800 text-stone-800 px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-stone-950 hover:text-white transition-all duration-300 self-start sm:self-auto shrink-0"
        >
          <svg
            className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
          Xem Flipbook
        </Link>
      </div>
      <ProjectsGrid />
    </main>
  );
}
