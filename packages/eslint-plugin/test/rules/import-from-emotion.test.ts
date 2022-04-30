/**
 * @jest-environment node
 */

import { TSESLint } from '@typescript-eslint/experimental-utils'
import rule from '../../src/rules/import-from-emotion'
import { RuleModuleForTesting, espreeParser } from '../test-utils'

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

ruleTester.run('emotion jsx', rule as unknown as RuleModuleForTesting, {
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
