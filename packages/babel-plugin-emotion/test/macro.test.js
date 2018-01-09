// @flow
import * as babel6 from 'babel-core'
import * as babel7 from '@babel/core'
import { createMacroTests } from './util'

const styledCases = {
  'tagged template literal member': {
    code: `
      import styled from './styled/macro'
      const SomeComponent = styled.div\`
        display: flex;
      \`
    `,
  },

  'tagged template literal function': {
    code: `
      import styled from './styled/macro'
      const SomeComponent = styled('div')\`
        display: flex;
      \`
    `,
  },

  'object member': {
    code: `
    import styled from './styled/macro'
    const SomeComponent = styled.div({
      display: 'flex'
    })
  `,
  },

  'object function': {
    code: `
    import styled from './styled/macro'
    const SomeComponent = styled('div')({
      display: 'flex'
    })
  `,
  },

  'some import that does not exist': {
    code: `
    import { thisDoesNotExist } from './styled/macro'
    const someOtherVar = thisDoesNotExist
    `,
  },

  'css from react': {
    code: `
    import { css } from './styled/macro'
    const someCls = css\`
      display: flex;
    \`
    `,
  },
}

for (const thing in styledCases) {
  styledCases[thing].filename = __filename
}

createMacroTests('styled macro', styledCases)

const cases = {
  injectGlobal: {
    code: `
    import { injectGlobal } from '../src/macro'
    injectGlobal\`
      body {
        margin: 0;
        padding: 0;
        & > div {
          display: none;
          
          &:hover {
            color: green;
            
            & span {
              color: red;
              
              &:after {
                content: "end of line"
              }
            }
          }
        }
      }
      html {
        background: green;
      }
  \`;`,
  },

  css: {
    code: `
    import { css } from '../src/macro'
    css\`
      margin: 12px 48px;
      color: #ffffff;
      display: flex;
      flex: 1 0 auto;
      color: blue;
      width: \${widthVar};
  \``,
  },

  'css object': {
    code: `
    import { css } from '../src/macro'
    const cls1 = css({ display: 'flex' })
    `,
  },

  hydrate: {
    code: `
    import { hydrate } from '../src/macro'
    const someOtherVar = hydrate
    `,
  },

  flush: {
    code: `
    import { flush } from '../src/macro'
    const someOtherVar = flush
    `,
  },

  'css call with no args': {
    code: `
    import { css } from '../src/macro'
    const cls1 = css()
    `,
  },

  'css inside of css': {
    code: `
    import { css } from '../src/macro'
    const cls2 = css\`
      font-size: 20px;
      @media (min-width: 420px) {
        color: blue;
        \${css\`
          width: 96px;
          height: 96px;
        \`};
        line-height: 40px;
      }
      background: green;
    \`
    `,
  },

  'some import that does not exist': {
    code: `
    import { thisDoesNotExist } from '../src/macro'
    const someOtherVar = thisDoesNotExist
    `,
  },

  keyframes: {
    code: `
    import { keyframes } from '../src/macro'
    const rotate360 = keyframes\`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  \``,
  },

  'multiple imports': {
    code: `
    import { keyframes, css } from '../src/macro'
    const rotate360 = keyframes\`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  \`
  const thing = css\`
  margin: 12px 48px;
  color: #ffffff;
  display: flex;
  flex: 1 0 auto;
  color: blue;
  width: \${widthVar};
\`
  `,
  },
}

for (const thing in cases) {
  cases[thing].filename = __filename
}

createMacroTests('macro', cases)

describe('styled macro', () => {
  test('babel 6 throws correct error when imported with commonjs', () => {
    const basic = `
      const styled = require('./styled/macro')
      const SomeComponent = styled('div')\`
        display: flex;
      \`
      `
    expect(() =>
      babel6.transform(basic, {
        plugins: [require('babel-macros')],
        filename: __filename,
        babelrc: false,
      })
    ).toThrowError(/the emotion macro must be imported with es modules/)
  })
  test('babel 7 throws correct error when imported with commonjs', () => {
    const basic = `
      const styled = require('./styled/macro')
      const SomeComponent = styled('div')\`
        display: flex;
      \`
      `
    expect(() =>
      babel7.transform(basic, {
        plugins: ['module:babel-macros'],
        filename: __filename,
        babelrc: false,
      })
    ).toThrowError(/the emotion macro must be imported with es modules/)
  })
})
