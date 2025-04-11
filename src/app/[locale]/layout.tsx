import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import { getScopedI18n } from '@/locales/server';

import { Theme } from '@radix-ui/themes';
import { I18nProviderClient } from '@/locales/client';

import '@radix-ui/themes/styles.css';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
  weight: 'variable',
  axes: ['opsz'],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n('seo');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}>) {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      className={inter.variable}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body style={{ textRendering: 'optimizeLegibility' }}>
        <I18nProviderClient locale={locale}>
          <Theme
            accentColor="gray"
            grayColor="gray"
            panelBackground="solid"
            radius="none"
          >
            {children}
          </Theme>
        </I18nProviderClient>
      </body>
    </html>
  );
}
