/**
 * @jest-environment node
 */

import { RuleTester } from '@typescript-eslint/rule-tester'
import rule from '../../src/rules/jsx-import'
import { espreeParser } from '../test-utils'

const ruleTester = new RuleTester({
  languageOptions: {
    parser: espreeParser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  }
})

ruleTester.run('emotion jsx', rule, {
  valid: [
    {
      code: `
      // @jsx jsx
      import { jsx } from '@emotion/react'

      let ele = <div css={{}} />
      `
    },
    {
      options: [{ runtime: 'classic' }],
      code: `
      // @jsx jsx
      import { jsx } from '@emotion/react'
      let ele = <div css={{}} />
      `
    },
    {
      options: [{ runtime: 'invalidRuntime' }],
      code: `
      // @jsx jsx
      import { jsx } from '@emotion/react'
      let ele = <div css={{}} />
      `
    },
    {
      options: [{ runtime: 'automatic' }],
      code: `
      /** @jsxImportSource @emotion/react */

      let ele = <div css={{}} />
      `
    },
    {
      options: [{ runtime: 'automatic' }],
      code: `
      // no css prop usage for test coverage
      let ele = <div nonecss={{}} />
      `
    },
    {
      options: [{ runtime: 'automatic', importSource: '@emotion/react' }],
      code: `
      /** @jsxImportSource @emotion/react */

      let ele = <div css={{}} />
      `
    },
    {
      code: `

      let ele = <div notCss={{}} />
      `
    },
    {
      code: `
        /** @jsx jsx */
        import {jsx} from '@emotion/react'
        // it's invalid but not for this rule
        let ele = <div css />
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
          messageId: 'cssPropWithPragma'
        }
      ],
      output: `
// @jsx jsx
import { jsx } from '@emotion/react'
let ele = <div css={{}} />
            `.trim()
    },
    {
      options: [{ runtime: 'automatic' }],
      code: `
let ele = <div css={{}} />
      `.trim(),
      errors: [
        {
          messageId: 'cssProp',
          data: { importSource: '@emotion/react' }
        }
      ],
      output: `
/** @jsxImportSource @emotion/react */
let ele = <div css={{}} />
            `.trim()
    },
    {
      options: [{ runtime: 'automatic', importSource: '@iChenLei/react' }],
      code: `
let ele = <div css={{}} />
      `.trim(),
      errors: [
        {
          messageId: 'cssProp',
          data: { importSource: '@iChenLei/react' }
        }
      ],
      output: `
/** @jsxImportSource @iChenLei/react */
let ele = <div css={{}} />
            `.trim()
    },
    {
      options: [{ runtime: 'automatic', importSource: '@iChenLei/react' }],
      code: `
/** @jsxImportSource invalid-react */
let ele = <div css={{}} />
      `.trim(),
      errors: [
        {
          messageId: 'cssProp',
          data: { importSource: '@iChenLei/react' }
        }
      ],
      output: `
/** @jsxImportSource @iChenLei/react */
let ele = <div css={{}} />
            `.trim()
    },
    {
      options: [{ runtime: 'classic' }],
      code: `
let ele = <div css={{}} />
      `.trim(),
      errors: [
        {
          messageId: 'cssPropWithPragma'
        }
      ],
      output: `
/** @jsx jsx */
import { jsx } from '@emotion/react'
let ele = <div css={{}} />
            `.trim()
    },
    {
      code: `
// @jsx jsx
import { css } from '@emotion/react'
let ele = <div css={{}} />
      `.trim(),
      errors: [
        {
          messageId: 'cssPropWithPragma'
        }
      ],
      output: `
// @jsx jsx
import { css, jsx } from '@emotion/react'
let ele = <div css={{}} />
            `.trim()
    },
    {
      code: `
// @jsx jsx
import DefaultExport from '@emotion/react'
let ele = <div css={{}} />
      `.trim(),
      errors: [
        {
          messageId: 'cssPropWithPragma'
        }
      ],
      output: `
// @jsx jsx
import DefaultExport, { jsx } from '@emotion/react'
let ele = <div css={{}} />
            `.trim()
    },
    {
      code: `
import * as Emotion from '@emotion/react'
let ele = <div css={{}} />
      `.trim(),
      errors: [
        {
          messageId: 'cssPropWithPragma'
        }
      ],
      output: `
/** @jsx Emotion.jsx */
import * as Emotion from '@emotion/react'
let ele = <div css={{}} />
            `.trim()
    },
    {
      code: `
let ele = <div css={{}} />
      `.trim(),
      errors: [
        {
          messageId: 'cssPropWithPragma'
        }
      ],
      output: `
/** @jsx jsx */
import { jsx } from '@emotion/react'
let ele = <div css={{}} />
                  `.trim()
    },
    {
      code: `
/** @jsx jsx */
import * as emotion from '@emotion/react'
let ele = <div css={{}} />
      `.trim(),
      errors: [
        {
          messageId: 'cssPropWithPragma'
        }
      ],
      output: `
/** @jsx emotion.jsx */
import * as emotion from '@emotion/react'
let ele = <div css={{}} />
      `.trim()
    },
    {
      code: `
import {jsx} from '@emotion/react'
let ele = <div css={{}} />
      `.trim(),
      errors: [
        {
          messageId: 'cssPropWithPragma'
        }
      ],
      output: `
/** @jsx jsx */
import {jsx} from '@emotion/react'
let ele = <div css={{}} />
      `.trim()
    },
    {
      code: `
import {jsx} from '@emotion/react'
let ele = <div css={{}} />
let ele2 = <div css={{}} />
      `.trim(),
      errors: [
        {
          messageId: 'cssPropWithPragma'
        },
        {
          messageId: 'cssPropWithPragma'
        }
      ],
      output: `
/** @jsx jsx */
import {jsx} from '@emotion/react'
let ele = <div css={{}} />
let ele2 = <div css={{}} />

      `.trim()
    },
    {
      settings: { react: { pragma: 'jsx' } },
      code: `
let ele = <div css={{}} />
      `.trim(),
      errors: [
        {
          messageId: 'cssPropWithPragma'
        }
      ],
      output: `
import { jsx } from '@emotion/react'
let ele = <div css={{}} />
    `.trim()
    },
    {
      settings: { react: { pragma: 'jsx' } },
      code: `
import { css } from '@emotion/react'
let ele = <div css={{}} />
      `.trim(),
      errors: [
        {
          messageId: 'cssPropWithPragma'
        }
      ],
      output: `
import { css, jsx } from '@emotion/react'
let ele = <div css={{}} />
    `.trim()
    },
    {
      settings: { react: { pragma: 'jsx' } },
      code: `
import DefaultExport from '@emotion/react'
let ele = <div css={{}} />
      `.trim(),
      errors: [
        {
          messageId: 'cssPropWithPragma'
        }
      ],
      output: `
import DefaultExport, { jsx } from '@emotion/react'
let ele = <div css={{}} />
    `.trim()
    },
    {
      code: `
    /** @jsx jsx */
    import {jsx} from '@emotion/react'
    let ele = <div css={\`color:hotpink;\`} />
          `.trim(),
      errors: [
        {
          messageId: 'templateLiterals'
        }
      ],
      output: `
    /** @jsx jsx */
    import {jsx, css} from '@emotion/react'
    let ele = <div css={css\`color:hotpink;\`} />
          `.trim()
    },
    {
      code: `
    /** @jsx jsx */
    import {jsx} from '@emotion/react'
    let css = 'something'
    let ele = <div css={\`color:hotpink;\`} />
          `.trim(),
      errors: [
        {
          messageId: 'templateLiterals'
        }
      ],
      output: `
    /** @jsx jsx */
    import {jsx, css as _css} from '@emotion/react'
    let css = 'something'
    let ele = <div css={_css\`color:hotpink;\`} />
          `.trim()
    },
    {
      code: `
    /** @jsx jsx */
    import {jsx, css} from '@emotion/react'
    let ele = <div css={\`color:hotpink;\`} />
          `.trim(),
      errors: [
        {
          messageId: 'templateLiterals'
        }
      ],
      output: `
    /** @jsx jsx */
    import {jsx, css} from '@emotion/react'
    let ele = <div css={css\`color:hotpink;\`} />
          `.trim()
    },
    {
      code: `
    /** @jsx emotion.jsx */
    import * as emotion from '@emotion/react'
    let ele = <div css={\`color:hotpink;\`} />
      `.trim(),
      errors: [
        {
          messageId: 'templateLiterals'
        }
      ],
      output: `
    /** @jsx emotion.jsx */
    import * as emotion from '@emotion/react'
    let ele = <div css={emotion.css\`color:hotpink;\`} />
      `.trim()
    }
  ]
})
