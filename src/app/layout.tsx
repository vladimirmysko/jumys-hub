import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Theme } from '@radix-ui/themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import '@radix-ui/themes/styles.css';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
  weight: 'variable',
  axes: ['opsz'],
});

export const metadata: Metadata = {
  title: 'Jumys Hub — платформа для поиска работы студентами и работодателями',
  description:
    'Jumys Hub — это платформа для университета, которая помогает студентам находить работу, а работодателям — находить студентов для стажировок и вакансий.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru' className={inter.variable} style={{ scrollBehavior: 'smooth' }}>
      <body style={{ textRendering: 'optimizeLegibility' }}>
        <NuqsAdapter>
          <Theme accentColor='gray' grayColor='gray' panelBackground='solid' radius='medium'>
            {children}
          </Theme>
        </NuqsAdapter>
      </body>
    </html>
  );
}
