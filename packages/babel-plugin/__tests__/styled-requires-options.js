// @flow
import babelTester from 'babel-tester'
import plugin from '@emotion/babel-plugin'

const cases = {
  'hash generation no file system': {
    code: `
import styled from '@emotion/styled'
styled.h1\`color:blue;\`
`,
    plugins: [plugin],
    babelFileName: undefined,
  },
  'autoLabel set to never': {
    code: `
import styled from '@emotion/styled'
const Foo = styled.h1\`color:hotpink;\`
    `,
    plugins: [[plugin, { autoLabel: 'never' }]],
    babelFileName: __filename,
  },
}

babelTester('styled inline', cases)
