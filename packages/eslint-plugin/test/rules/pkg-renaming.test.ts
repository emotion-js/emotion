/**
 * @jest-environment node
 */

import { TSESLint } from '@typescript-eslint/utils'
import rule from '../../src/rules/pkg-renaming'
import { espreeParser } from '../test-utils'

const ruleTester = new TSESLint.RuleTester({
  parser: espreeParser,
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
})

ruleTester.run('pkg-renaming', rule, {
  valid: [
    {
      code: `
      import { css } from '@emotion/css'
      `
    }
  ],

  invalid: [
    {
      code: `import { css } from 'emotion'`,
      errors: [
        {
          messageId: 'renamePackage',
          data: {
            beforeName: '"emotion"',
            afterName: '"@emotion/css"'
          }
        }
      ],
      output: `import { css } from '@emotion/css'`
    },
    {
      code: `import { css } from '@emotion/core'`,
      errors: [
        {
          messageId: 'renamePackage',
          data: {
            beforeName: '"@emotion/core"',
            afterName: '"@emotion/react"'
          }
        }
      ],
      output: `import { css } from '@emotion/react'`
    },
    {
      code: `import css from '@emotion/css'`,
      errors: [
        {
          messageId: 'exportChange',
          data: {
            name: '@emotion/css',
            replacement: '@emotion/react'
          }
        }
      ],
      output: `import { css } from '@emotion/react'`
    },
    {
      code: `import css from '@emotion/css/macro'`,
      errors: [
        {
          messageId: 'exportChange',
          data: {
            name: '@emotion/css/macro',
            replacement: '@emotion/react/macro'
          }
        }
      ],
      output: `import { css } from '@emotion/react/macro'`
    },
    {
      code: `import {ThemeProvider, withTheme} from 'emotion-theming'`,
      errors: [
        {
          messageId: 'emotionTheming'
        }
      ],
      output: `import {ThemeProvider, withTheme} from '@emotion/react'`
    }
  ]
})
