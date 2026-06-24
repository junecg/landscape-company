import type { Metadata } from 'next';
import { Bricolage_Grotesque, Plus_Jakarta_Sans, Public_Sans, Be_Vietnam_Pro } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import BackToTop from '@/components/BackToTop';
import SmoothScroll from '@/components/SmoothScroll';
import '../globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-public-sans',
  display: 'swap',
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-be-vietnam',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lapla Landscape - Thiết Kế Cảnh Quan',
  description: 'Chuyên thiết kế và thi công cảnh quan cao cấp',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'vi' | 'en')) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  return (
    <html lang={locale}>
      <body className={`site-body ${bricolage.variable} ${plusJakarta.variable} ${publicSans.variable} ${beVietnamPro.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            {children}
            <BackToTop />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
