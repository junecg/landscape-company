import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsDetailClient from '@/components/NewsDetailClient';
import { prisma } from '@/lib/prisma';
import { newsArticles } from '@/lib/data';

export async function generateStaticParams() {
  const locales = ['vi', 'en'];
  try {
    const articles = await prisma.newsArticle.findMany({ select: { slug: true } });
    return locales.flatMap((locale) => articles.map((a) => ({ locale, slug: a.slug })));
  } catch {
    return locales.flatMap((locale) => newsArticles.map((a) => ({ locale, slug: a.slug })));
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  let article: {
    slug: string; titleVi: string; titleEn: string;
    summaryVi: string; summaryEn: string;
    contentVi: string; contentEn: string;
    image: string; categoryVi: string; categoryEn: string;
    date: string; readTime: number;
  } | null = null;

  try {
    article = await prisma.newsArticle.findUnique({ where: { slug } });
  } catch {
    // DB unavailable — fall back to static data
  }

  // Fallback to hardcoded data
  if (!article) {
    const staticArticle = newsArticles.find((a) => a.slug === slug);
    if (!staticArticle) notFound();
    article = {
      ...staticArticle,
      contentVi: staticArticle.contentVi.join('\n\n'),
      contentEn: staticArticle.contentEn.join('\n\n'),
    };
  }

  if (!article) notFound();

  return (
    <>
      <Navbar />
      <NewsDetailClient article={article} />
      <Footer />
    </>
  );
}
