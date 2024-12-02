/**
 * @jest-environment node
 */

import { RuleTester } from '@typescript-eslint/rule-tester'
import rule from '../../src/rules/import-from-emotion'
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
      code: `import { css } from 'emotion'`
    }
  ],

  invalid: [
    {
      code: `import { css } from 'react-emotion'`,
      errors: [
        {
          messageId: 'incorrectImport'
        }
      ],
      output: `import { css } from 'emotion'`
    },
    {
      code: `import styled, { css } from 'react-emotion'`,
      errors: [
        {
          messageId: 'incorrectImport'
        }
      ],
      output: `import styled from '@emotion/styled';\nimport { css } from 'emotion';`
    },
    {
      code: `import styled, { css as somethingElse } from 'react-emotion'`,
      errors: [
        {
          messageId: 'incorrectImport'
        }
      ],
      output: `import styled from '@emotion/styled';\nimport { css as somethingElse } from 'emotion';`
    }
  ]
})
