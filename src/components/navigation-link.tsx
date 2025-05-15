'use client';

import { usePathname } from 'next/navigation';
import NextLink from 'next/link';

import { Link } from '@radix-ui/themes';
import type { LinkProps } from '@radix-ui/themes';

export function NavigationLink({ children, href = '#', ...props }: LinkProps) {
  const pathname = usePathname();
  const isActive = pathname.includes(href);

  return (
    <Link
      size='2'
      underline={isActive ? 'none' : 'hover'}
      weight={isActive ? 'medium' : 'regular'}
      highContrast={isActive}
      asChild
      style={{ transition: 'font-weight 0.15s ease-out' }}
      {...props}
    >
      <NextLink href={href}>{children}</NextLink>
    </Link>
  );
}
