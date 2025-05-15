import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Theme } from '@radix-ui/themes';

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
  title: 'Платформа для поиска работы студентами и работодателями — Jumys Hub',
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
        <Theme accentColor='gray' grayColor='gray' panelBackground='solid' radius='none'>
          {children}
        </Theme>
      </body>
    </html>
  );
}
