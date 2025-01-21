import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { clsx } from 'clsx';
import { getScopedI18n } from '@/locales/server';

import { I18nProviderClient } from '@/locales/client';
import { Theme } from '@radix-ui/themes';

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
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale} className={clsx(inter.variable)}>
      <body style={{ textRendering: 'optimizeLegibility' }}>
        <I18nProviderClient locale={locale}>
          <Theme
            accentColor="teal"
            grayColor="gray"
            radius="medium"
            scaling="100%"
            panelBackground="solid"
          >
            {children}
          </Theme>
        </I18nProviderClient>
      </body>
    </html>
  );
}
