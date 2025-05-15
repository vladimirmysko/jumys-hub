/** @type {import('prettier').Config} */
const config = {
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  tabWidth: 2,
  printWidth: 100,
  bracketSpacing: true,
  endOfLine: 'lf',

  overrides: [
    {
      files: ['*.md', '*.mdx', '*.css', '*.scss'],
      options: {
        singleQuote: false,
      },
    },
  ],
};

export default config;
