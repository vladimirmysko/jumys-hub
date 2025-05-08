/** @type {import('prettier').Config & import('@trivago/prettier-plugin-sort-imports').PluginConfig}*/
const config = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',

  plugins: ['@trivago/prettier-plugin-sort-imports'],

  importOrder: [
    '^server-only$',
    '^react$',
    '^next/server$',
    '^next/?(.*)$',
    '^next-international(.*)$',
    '^@radix-ui/themes/?(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@/config/(.*)$',
    '^@/locales/(.*)$',
    '^@/lib/(.*)$',
    '^@/components/(.*)$',
    '^@/actions/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  overrides: [
    {
      files: ['*.md', '*.mdx'],
      options: { printWidth: 80 },
    },
  ],
}

export default config
