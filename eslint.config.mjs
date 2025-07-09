// eslint.config.mjs
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import next from 'eslint-config-next';
import prettier from 'eslint-config-prettier';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default await tseslint.config([
  js.configs.recommended, // JS 기본 룰
  ...next(), // Next.js 공식 룰
  ...tseslint.configs.recommended, // TypeScript 룰
  prettier, // ✅ Prettier와 충돌 방지
  {
    ignores: ['node_modules', '.next', 'dist', 'build'],
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'prettier/prettier': 'error', // Prettier 위반 시 ESLint 에러
    },
  },
]);
