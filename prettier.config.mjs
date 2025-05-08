/** @type {import('prettier').Config & import('@ianvs/prettier-plugin-sort-imports').PluginConfig} */
export default {
  printWidth: 100,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',

  plugins: ['@ianvs/prettier-plugin-sort-imports'],

  importOrder: [
    // Node.js built-in modules
    '<BUILTIN_MODULES>',

    // React core
    '^react$',
    '^react-dom$',

    // Next.js imports
    '^next$',
    '^next/navigation$',
    '^next/router$',
    '^next/headers$',
    '^next/server$',
    '^next/font(/.*)?$',
    '^next/image$',
    '^next/link$',
    '^next(/.*)?$',
    '',

    // Type imports for React and Next.js
    '<TYPES>^react$',
    '<TYPES>^react-dom$',
    '<TYPES>^next(/.*)?$',
    '',

    // Server components and utilities
    '^@/lib/server(/.*)$',
    '^@/utils/server(/.*)$',
    '^@/actions(/.*)?$',
    '<TYPES>^@/actions(/.*)?$',
    '',

    // Client utilities
    '^@/lib/client(/.*)$',
    '^@/lib(/.*)$',
    '^@/utils(/.*)$',
    '<TYPES>^@/lib(/.*)$',
    '<TYPES>^@/utils(/.*)$',
    '',

    // Radix UI themes and components
    '^@radix-ui/themes$',
    '^@radix-ui/react-icons$',
    '^@radix-ui/themes(/.*)?$',
    '^@radix-ui/react-(.*)?$',
    '',

    // Other third-party modules
    '<THIRD_PARTY_MODULES>',
    '<TYPES>',
    '',

    // App components by purpose
    '^@/components/ui(/.*)$',
    '^@/components/forms(/.*)$',
    '^@/components/layout(/.*)$',
    '^@/components(/.*)$',
    '<TYPES>^@/components(/.*)$',
    '',

    // Hooks
    '^@/hooks(/.*)$',
    '<TYPES>^@/hooks(/.*)$',
    '',

    // Internationalization
    '^@/locales(/.*)$',
    '<TYPES>^@/locales(/.*)$',
    '',

    // Relative imports - local to the file
    '^[./]',
    '<TYPES>^[./]',
    '',

    // Styles (Tailwind directives would be in global CSS)
    '.css$',
    '.scss$',
  ],

  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  importOrderTypeScriptVersion: '5.8.3',
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
}
