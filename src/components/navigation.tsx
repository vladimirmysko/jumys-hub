'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'

import { Flex, Link } from '@radix-ui/themes'
import type { FlexProps } from '@radix-ui/themes'

export function Navigation(props: Omit<FlexProps, 'children'>) {
  const pathname = usePathname()

  const links = [
    { href: '/vacancies', label: 'Vacancies' },
    { href: '/applications', label: 'Applications' },
    { href: '/resume', label: 'Resume' },
    { href: '/profile', label: 'Profile' },
  ]

  return (
    <Flex direction="row" align="center" gap="5" {...props}>
      {links.map(link => {
        const isActive = pathname.includes(link.href)

        return (
          <Link
            key={link.href}
            size="2"
            underline="hover"
            weight={isActive ? 'bold' : 'regular'}
            highContrast={isActive}
            asChild
          >
            <NextLink href={link.href}>{link.label}</NextLink>
          </Link>
        )
      })}
    </Flex>
  )
}
