// @flow
import { createInlineTests } from './util'

const inline = {
  labelFormat: {
    code: `
    import {css} from 'emotion'
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
    opts: {
      labelFormat: 'my-css-[local]',
      autoLabel: true
    }
  },

  'label format with filename and local': {
    code: `
    import {css} from 'emotion'
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
    opts: {
      labelFormat: 'my-css-[filename]-[local]',
      autoLabel: true,
      filename: __filename
    }
  },

  'custom instance': {
    code: `
    import {css as lol} from 'my-emotion-instance'
    lol\`color:hotpink;\``,
    opts: {
      instances: ['my-emotion-instance']
    },
    filename: __filename
  },
  'custom instance relative': {
    code: `
    import {css as lol} from './my-emotion-instance'
    lol\`color:hotpink;\``,
    opts: {
      instances: ['./my-emotion-instance']
    },
    filename: __filename
  },
  'custom instance relative complex': {
    code: `
    import {css as lol} from '../test/my-emotion-instance'
    lol\`color:hotpink;\``,
    opts: {
      instances: ['./my-emotion-instance']
    },
    filename: __filename
  }
}
createInlineTests('babel css inline', inline)
