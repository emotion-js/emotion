/**
 * @jest-environment node
 */

const { RuleTester } = require('eslint')
const rule = require('@emotion/eslint-plugin').rules['pkg-renaming']

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
})

const ruleTester = new RuleTester()

ruleTester.run('pkg-renaming', rule, {
  valid: [
    {
      code: `
      import { css } from '@emotion/css'
      `,
    },
  ],

  invalid: [
    {
      code: `import { css } from 'emotion'`,
      errors: [
        {
          message:
            '"emotion" has been renamed to "@zedvision/emotion-css", please import it from "@zedvision/emotion-css" instead',
        },
      ],
      output: `import { css } from '@emotion/css'`,
    },
    {
      code: `import { css } from '@emotion/core'`,
      errors: [
        {
          message:
            '"@zedvision/emotion-core" has been renamed to "@zedvision/emotion-react", please import it from "@zedvision/emotion-react" instead',
        },
      ],
      output: `import { css } from '@emotion/react'`,
    },
    {
      code: `import css from '@emotion/css'`,
      errors: [
        {
          message:
            'The default export of "@zedvision/emotion-css" in Emotion 10 has been moved to a named export, `css`, from "@zedvision/emotion-react" in Emotion 11, please import it from "@zedvision/emotion-react"',
        },
      ],
      output: `import { css } from '@emotion/react'`,
    },
    {
      code: `import css from '@emotion/css/macro'`,
      errors: [
        {
          message:
            'The default export of "@zedvision/emotion-css/macro" in Emotion 10 has been moved to a named export, `css`, from "@zedvision/emotion-react/macro" in Emotion 11, please import it from "@zedvision/emotion-react/macro"',
        },
      ],
      output: `import { css } from '@emotion/react/macro'`,
    },
    {
      code: `import {ThemeProvider, withTheme} from 'emotion-theming'`,
      errors: [
        {
          message:
            '"emotion-theming" has been moved into "@zedvision/emotion-react", please import its exports from "@zedvision/emotion-react"',
        },
      ],
      output: `import {ThemeProvider, withTheme} from '@emotion/react'`,
    },
  ],
})
