import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { clsx } from 'clsx';
import { getScopedI18n } from '@/locales/server';

import { I18nProviderClient } from '@/locales/client';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n('seo');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      className={clsx(geistSans.variable, geistMono.variable)}
    >
      <body style={{ textRendering: 'optimizeLegibility' }}>
        <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
      </body>
    </html>
  );
}
