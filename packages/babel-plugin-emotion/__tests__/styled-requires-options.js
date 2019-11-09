// @flow
import babelTester from 'babel-tester'

const cases = {
  'hash generation no file system': {
    code: 'import styled from "@emotion/styled";\nstyled.h1`color:blue;`',
    babelFileName: undefined
  }
}

babelTester('styled inline', cases)
