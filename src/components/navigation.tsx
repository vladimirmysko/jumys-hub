'use client';

import { usePathname } from 'next/navigation';
import NextLink from 'next/link';

import { Flex, Link } from '@radix-ui/themes';
import type { FlexProps } from '@radix-ui/themes';

const links = [
  { label: 'Вакансии', href: '/vacancies' },
  { label: 'Профиль', href: '/profile' },
];

export function Navigation(props: Omit<FlexProps, 'children'>) {
  const pathname = usePathname();

  return (
    <Flex direction='row' align='baseline' gap='5' {...props}>
      {links.map((link) => {
        const isActive = pathname.includes(link.href);

        return (
          <Link
            key={link.href}
            size='2'
            underline={isActive ? 'none' : 'hover'}
            weight={isActive ? 'medium' : 'regular'}
            highContrast={isActive}
            asChild
            style={{ transition: 'font-weight 0.15s ease-out' }}
          >
            <NextLink href={link.href}>{link.label}</NextLink>
          </Link>
        );
      })}
    </Flex>
  );
}
