/**
 * @jest-environment node
 */

const { RuleTester } = require('eslint')
const rule = require('eslint-plugin-emotion').rules['jsx-import']

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
})

const ruleTester = new RuleTester()

ruleTester.run('emotion jsx', rule, {
  valid: [
    {
      code: `
      // @jsx jsx
      import { jsx } from '@emotion/core'

      let ele = <div css={{}} />
      `
    },
    {
      code: `

      let ele = <div notCss={{}} />
      `
    }
  ],

  invalid: [
    {
      code: `
// @jsx jsx
let ele = <div css={{}} />
      `.trim(),
      errors: [
        {
          message:
            'The css prop can only be used if jsx from @emotion/core is imported and it is set as the jsx pragma'
        }
      ],
      output: `
// @jsx jsx
import { jsx } from '@emotion/core'
let ele = <div css={{}} />
            `.trim()
    },
    {
      code: `
// @jsx jsx
import { css } from '@emotion/core'
let ele = <div css={{}} />
      `.trim(),
      errors: [
        {
          message:
            'The css prop can only be used if jsx from @emotion/core is imported and it is set as the jsx pragma'
        }
      ],
      output: `
// @jsx jsx
import { css, jsx } from '@emotion/core'
let ele = <div css={{}} />
            `.trim()
    },
    {
      code: `
// @jsx jsx
import DefaultExport from '@emotion/core'
let ele = <div css={{}} />
      `.trim(),
      errors: [
        {
          message:
            'The css prop can only be used if jsx from @emotion/core is imported and it is set as the jsx pragma'
        }
      ],
      output: `
// @jsx jsx
import DefaultExport, { jsx } from '@emotion/core'
let ele = <div css={{}} />
            `.trim()
    },
    {
      code: `
import * as Emotion from '@emotion/core'
let ele = <div css={{}} />
      `.trim(),
      errors: [
        {
          message:
            'The css prop can only be used if jsx from @emotion/core is imported and it is set as the jsx pragma'
        }
      ],
      output: `
/** @jsx Emotion.jsx */
import * as Emotion from '@emotion/core'
let ele = <div css={{}} />
            `.trim()
    },
    {
      code: `
let ele = <div css={{}} />
      `.trim(),
      errors: [
        {
          message:
            'The css prop can only be used if jsx from @emotion/core is imported and it is set as the jsx pragma'
        }
      ],
      output: `
/** @jsx jsx */
import { jsx } from '@emotion/core'
let ele = <div css={{}} />
                  `.trim()
    },
    {
      code: `
import {jsx} from '@emotion/core'
let ele = <div css={{}} />
      `.trim(),
      errors: [
        {
          message:
            'The css prop can only be used if jsx from @emotion/core is imported and it is set as the jsx pragma'
        }
      ],
      output: `
/** @jsx jsx */
import {jsx} from '@emotion/core'
let ele = <div css={{}} />
      `.trim()
    },
    {
      code: `
import {jsx} from '@emotion/core'
let ele = <div css={{}} />
let ele2 = <div css={{}} />
      `.trim(),
      errors: [
        {
          message:
            'The css prop can only be used if jsx from @emotion/core is imported and it is set as the jsx pragma'
        },
        {
          message:
            'The css prop can only be used if jsx from @emotion/core is imported and it is set as the jsx pragma'
        }
      ],
      output: `
/** @jsx jsx */
import {jsx} from '@emotion/core'
let ele = <div css={{}} />
let ele2 = <div css={{}} />

      `.trim()
    },
    {
      code: `
    /** @jsx jsx */
    import {jsx} from '@emotion/core'
    let ele = <div css={\`color:hotpink;\`} />
          `.trim(),
      errors: [
        {
          message:
            'Template literals should be replaced with tagged template literals using `css` when using the css prop'
        }
      ],
      output: `
    /** @jsx jsx */
    import {jsx, css} from '@emotion/core'
    let ele = <div css={css\`color:hotpink;\`} />
          `.trim()
    },
    {
      code: `
    /** @jsx jsx */
    import {jsx} from '@emotion/core'
    let css = 'something'
    let ele = <div css={\`color:hotpink;\`} />
          `.trim(),
      errors: [
        {
          message:
            'Template literals should be replaced with tagged template literals using `css` when using the css prop'
        }
      ],
      output: `
    /** @jsx jsx */
    import {jsx, css as _css} from '@emotion/core'
    let css = 'something'
    let ele = <div css={_css\`color:hotpink;\`} />
          `.trim()
    },
    {
      code: `
    /** @jsx jsx */
    import {jsx, css} from '@emotion/core'
    let ele = <div css={\`color:hotpink;\`} />
          `.trim(),
      errors: [
        {
          message:
            'Template literals should be replaced with tagged template literals using `css` when using the css prop'
        }
      ],
      output: `
    /** @jsx jsx */
    import {jsx, css} from '@emotion/core'
    let ele = <div css={css\`color:hotpink;\`} />
          `.trim()
    }
  ]
})
