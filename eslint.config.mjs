import globals from 'globals'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import emotion from '@emotion/eslint-plugin'
import react from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      '**/lib/',
      '**/dist/',
      '**/coverage/',
      '**/node_modules/',
      '**/stylis.min.js',
      'demo/dist',
      'site/out'
    ]
  },
  tseslint.configs.eslintRecommended,
  {
    plugins: {
      '@emotion': emotion,
      react
    },
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.browser
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: 0
    },
    rules: {
      camelcase: 0,
      'no-template-curly-in-string': 0,
      'prefer-const': 0,
      'no-unused-vars': 0,
      'prettier/prettier': [
        'error',
        {
          parser: 'typescript'
        }
      ],
      'react/jsx-curly-brace-presence': 0,
      'react/jsx-handler-names': 0,
      'react/no-unused-prop-types': 0,
      'react/prop-types': 0,
      'react/react-in-jsx-scope': 0,
      '@emotion/pkg-renaming': 2
    }
  },
  {
    files: ['**/*.test.js', '**/__tests__/**'],
    ignores: ['**/__fixtures__/*'],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  },
  prettierRecommended
)
