import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsDetailClient from '@/components/NewsDetailClient';
import { prisma } from '@/lib/prisma';

export async function generateStaticParams() {
  const locales = ['vi', 'en'];
  const articles = await prisma.newsArticle.findMany({ select: { slug: true }, where: { published: true } });
  return locales.flatMap((locale) => articles.map((a) => ({ locale, slug: a.slug })));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = await prisma.newsArticle.findUnique({ where: { slug, published: true } });

  if (!article) notFound();

  return (
    <>
      <Navbar />
      <NewsDetailClient article={article} />
      <Footer />
    </>
  );
}
