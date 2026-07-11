import autoImports from './.wxt/eslint-auto-imports.mjs';
import tsparser from '@typescript-eslint/parser';
import eslintPlugin from '@typescript-eslint/eslint-plugin';

export default [autoImports,
    {
        plugins: {
            "@typescript-eslint": eslintPlugin,
        },
        ignores: ['.wxt/**', 'dist/**', 'node_modules/**', '.output/**'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parser: tsparser,
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            }
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            'no-trailing-spaces': 'error',
            'eol-last': 'error',
            'space-in-parens': ['error', 'never'],
            'no-multiple-empty-lines': 'warn',
            'prefer-const': 'error',
            'space-infix-ops': 'error',
            'no-useless-escape': 'error',
            'no-var': 'warn',
            'no-await-in-loop': 'warn',
        },
    }
];
