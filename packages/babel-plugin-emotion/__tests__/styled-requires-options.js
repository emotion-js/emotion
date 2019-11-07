// @flow
import { createInlineTests } from 'old-babel-tester'

const cases = {
  'hash generation no file system': {
    code: 'import styled from "@emotion/styled";\nstyled.h1`color:blue;`',
    filename: undefined
  }
}

createInlineTests('styled inline', cases)
