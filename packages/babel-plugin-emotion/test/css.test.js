// @flow
import { createInlineTests, createExtractTests } from './util'

const inline = {
  'css basic': {
    code: `
      css\`
      margin: 12px 48px;
      color: #ffffff;
      display: flex;
      flex: 1 0 auto;
      color: blue;
      @media(min-width: 420px) {
        line-height: 40px;
      }
      width: \${widthVar};
    \``,
  },

  'css basic renamed as option': {
    code: `
      cows\`
      margin: 12px 48px;
      color: #ffffff;
      display: flex;
      flex: 1 0 auto;
      color: blue;
      @media(min-width: 420px) {
        line-height: 40px;
      }
      width: \${widthVar};
    \``,

    opts: { importedNames: { css: 'cows' } },
  },

  'css basic as cows': {
    code: `
      import { css as cows } from 'emotion';
      cows\`
      margin: 12px 48px;
      color: #ffffff;
      display: flex;
      flex: 1 0 auto;
      color: blue;
      @media(min-width: 420px) {
        line-height: 40px;
      }
      width: \${widthVar};
    \``,
  },

  'css with float property': {
    code: `
      css\`
        float: left;
    \``,
  },

  'css random expression': {
    code: `css\`
      font-size: 20px;
      @media(min-width: 420px) {
        color: blue;
        \${css\`width: 96px; height: 96px;\`};
        line-height: 26px;
      }
      background: green;
      \${{ backgroundColor: "hotpink" }};
    \`
    `,
  },

  'nested expanded properties': {
    code: `
      css\`
      margin: 12px 48px;
      & .div {
        display: flex;
      }
    \``,
  },

  'interpolation in selector': {
    code: `
      const cls2 = css\`
      margin: 12px 48px;
      color: #ffffff;
      \${className} {
        display: none;
      }
      \`
    `,
  },

  '::placeholder': {
    code: `
      const cls1 = css({
        '::placeholder': {
          color: 'green',
          display: 'flex'
        }
      })
      const cls2 = css\`
        ::placeholder {
          color: green;
          display: flex;
        }
      \`
    `,
  },

  ':fullscreen': {
    code: `
    const cls1 = css({
      ':fullscreen': {
        color: 'green',
        display: 'flex'
      }
    })
    const cls2 = css\`
      :fullscreen {
        color: green;
        display: flex;
      }
    \`
  `,
  },

  'only styles on nested selector': {
    code: `
      const cls1 = css\`
        display: flex;
      \`
      const cls2 = css\`
        &:hover {
          background: pink;
        }
      \`
    `,
  },

  'object with a bunch of stuff': {
    code: `
    const cls2 = css({
      float: 'left',
      display: 'flex',
      flex: 1,
      alignItems: \`\${'center'}\`
    })
  `,
  },

  'array of objects': {
    code: `
    const cls2 = css([{
      display: 'flex',
      flex: 1,
      alignItems: \`\${'center'}\`
    }, {
      justifyContent: 'flex-start'
    }])
  `,
  },

  'symbols inside of ""': {
    code: `
    const cls = css\`content:  "  {  }  "\`
  `,
  },

  hoisting: {
    code: `
      function test () {
        const cls1 = css\`
          font-size: 20px;
          @media(min-width: 420px) {
            color: blue;
            \${css\`width: 96px; height: 96px;\`};
            line-height: 26px;
          }
          background: green;
          \${{ backgroundColor: "hotpink" }};
        \`

        const cls2 = css\`\${{color: 'blue'}}\`

        const cls3 = css\`
          display: flex;
          &:hover {
            color: hotpink;
          }
        \`
        function inner () {
          const styles = { color: "darkorchid" };
          const color = 'aquamarine';

          const cls4 = css\`
            \${cls3};
            \${cls1};
            \${() => ({ color: "darkorchid" })};
            \${() => ({ color })};
            \${css\`height: 420px;width: \${styles}\`};
          \`
        }
      }
    `,
    opts: { hoist: true },
  },
  autoLabel: {
    code: `
function test () {
  const cls1 = css\`
    font-size: 20px;
    @media(min-width: 420px) {
      color: blue;
      \${css\`width: 96px; height: 96px;\`};
      line-height: 26px;
    }
    background: green;
    \${{ backgroundColor: "hotpink" }};
  \`

  const cls2 = css\`\${{color: 'blue'}}\`
  const cls4 = css({color: "hotpink"})

  const cls3 = css\`
    display: flex;
    &:hover {
      color: hotpink;
    }
  \`
  function inner () {
    const styles = { color: "darkorchid" };
    const color = 'aquamarine';

    const cls4 = css\`
      \${cls3};
      \${cls1};
      \${() => ({ color: "darkorchid" })};
      \${() => ({ color })};
      \${css\`height: 420px;width: \${styles}\`};
    \`
  }
}
`,
    opts: { autoLabel: true },
  },

  'basic object support': {
    code: `css({display: 'flex'})`,
  },

  'renamed-import: basic object support': {
    code: `cows({display: 'flex'})`,
    opts: { importedNames: { css: 'cows' } },
  },

  'dynamically renamed-import: basic object support': {
    code: `import { css as cows } from 'emotion'; cows({display: 'flex'})`,
  },

  objects: {
    code: `
        css({
          borderRadius: '50%',
          transition: 'transform 400ms ease-in-out',
          boxSizing: 'border-box',
          display: 'flex',
          ':hover': {
              transform: 'scale(1.2)'
          }
      })
 `,
  },

  'dynamic property objects': {
    code: `
      css({
        fontSize: 10,
        [\`w$\{'idth'}\`]: 20
      })
     `,
  },
  'custom instance': {
    code: `
    import {css as lol} from 'my-emotion-instance'
    lol\`color:hotpink;\``,
    opts: {
      instances: ['my-emotion-instance'],
    },
    filename: __filename,
  },
  'custom instance relative': {
    code: `
    import {css as lol} from './my-emotion-instance'
    lol\`color:hotpink;\``,
    opts: {
      instances: ['./my-emotion-instance'],
    },
    filename: __filename,
  },
  'custom instance relative complex': {
    code: `
    import {css as lol} from '../test/my-emotion-instance'
    lol\`color:hotpink;\``,
    opts: {
      instances: ['./my-emotion-instance'],
    },
    filename: __filename,
  },
}
createInlineTests('babel css inline', inline)

const extract = {
  'babel css extract basic': {
    code: `
      css\`
      margin: 12px 48px;
      color: #ffffff;
      display: flex;
      flex: 1 0 auto;
      color: blue;
    \``,
  },
}

createExtractTests('babel css extract', extract)
