import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
});

const eslintConfig = [
    ...compat.config({
        extends: ['next', 'prettier'],
        ignorePatterns: ['node_modules'],
        plugins: ['@typescript-eslint', 'prettier', 'unused-imports'],
        parser: '@typescript-eslint/parser',
        parserOptions: {
            project: ['./tsconfig.json'],
        },
        rules: {
            'no-console': [
                'warn',
                {
                    allow: ['warn', 'error'],
                },
            ],
            'react-hooks/exhaustive-deps': 'off',
            'no-unused-vars': 1,
            'unused-imports/no-unused-imports': 1,
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'variable',
                    types: ['boolean'],
                    format: ['PascalCase'],
                    prefix: ['is', 'has', 'have', 'should', 'show', 'can', 'did', 'will'],
                },
            ],
        },
    }),
];

export default eslintConfig;
