import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsonPlugin from 'eslint-plugin-json';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  // Archivos a ignorar
  {
    ignores: ['node_modules/**', '.vscode/**', '.idea/**', '.DS_Store', 'public/**', '**/*.json'],
  },

  // Configuración base de ESLint
  js.configs.recommended,

  // Configuración para archivos TypeScript y React
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.json'],
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        React: 'readonly',
      },
    },
    plugins: {
      '@stylistic': stylistic,
      'react-hooks': reactHooks,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Reglas recomendadas de React
      ...stylistic.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Reglas personalizadas
      'import/order': [
        'error',
        {
          groups: [['builtin'], ['external'], ['internal'], ['parent', 'sibling', 'index'], ['object', 'type']],
          pathGroups: [
            {
              pattern: '@(react|react-router-dom)',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['internal', 'react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          endOfLine: 'auto',
        },
      ],
      'import/no-extraneous-dependencies': 'off',
      'react/display-name': 'off',
      'react/button-has-type': 'off',
      'no-nested-ternary': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'max-len': 'off',
      radix: 'off',
      'jsx-a11y/control-has-associated-label': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'import/prefer-default-export': 'off',
      'no-underscore-dangle': 'off',
      '@stylistic/no-unused-expressions': 'off',
      'import/no-dynamic-require': 'off',
      'no-use-before-define': 'off',
      'import/extensions': 'off',
      'react/prop-types': 'off',
      'no-await-in-loop': 'off',
      '@stylistic/comma-dangle': [
        'error',
        {
          arrays: 'ignore',
          objects: 'ignore',
          imports: 'never',
          exports: 'never',
          functions: 'ignore',
          enums: 'ignore',
        },
      ],
      '@stylistic/comma-spacing': [
        'error',
        {
          before: false,
          after: true,
        },
      ],
      '@stylistic/dot-location': ['error'],
      '@stylistic/keyword-spacing': ['error', { before: true }],
      '@stylistic/lines-between-class-members': ['error', 'always'],
      '@stylistic/naming-convention': 'off',
      '@stylistic/no-extra-semi': 'error',
      'no-loop-func': 'error',
      'no-redeclare': 'error',
      '@stylistic/space-before-function-paren': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'react/jsx-props-no-spreading': 'off',
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 1,
          maxBOF: 0,
        },
      ],
      'no-unused-vars': 'off',
    },
  },

  {
    files: ['**/*.json'],
    plugins: {
      json: jsonPlugin,
    },
    languageOptions: {
      parser: jsonPlugin.parseForESLint,
    },
    rules: {
      ...jsonPlugin.configs.recommended.rules,
    },
  },

  prettierConfig,
];
