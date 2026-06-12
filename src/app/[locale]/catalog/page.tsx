import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import CatalogViewer from '@/components/CatalogViewer';

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col overflow-hidden" style={{ height: '100dvh', backgroundColor: '#f5f2eb' }}>
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 shrink-0 z-10" style={{ height: 48, backgroundColor: '#ffffff', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <Link
          href={`/${locale}/projects`}
          className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase transition-colors"
          style={{ color: '#6b7280' }}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          {locale === 'vi' ? 'Dự Án' : 'Projects'}
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: '#0f541e' }}>LAPLA</span>
          <span className="w-px h-3" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }} />
          <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: '#6b7280' }}>
            {locale === 'vi' ? 'Danh mục dự án' : 'Project Catalog'}
          </span>
        </div>
        <div style={{ width: 96 }} />
      </header>

      {/* Catalog viewer fills remaining height */}
      <div className="flex-1 min-h-0">
        <CatalogViewer locale={locale} />
      </div>
    </div>
  );
}
