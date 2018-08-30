// @flow
import { createInlineTests } from './util'

const cases = {
  'hash generation no file system': {
    code: 'import styled from "@emotion/styled";\nstyled.h1`color:blue;`',
    filename: ''
  }
}

createInlineTests('styled inline', cases)
