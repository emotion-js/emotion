// @flow
import { createInlineTests, createExtractTests } from './util'

const cases = {
  'no use': {
    code: 'styled.h1``',
  },

  'no dynamic': {
    code: 'styled.h1`color:blue;`',
  },

  'dynamic fns': {
    code: `const Avatar = styled('img')\`
      width: 96px;
      height: 96px;

      border-radius: $\{props =>
        props.theme.borderRadius};

      border: 1px solid $\{props =>
        props.theme.borderColor};
    \``,
    extract: false,
  },

  'more than 10 dynamic values': {
    code: `const H1 = styled('h1')\`
    text-decoration: $\{'underline'};
    border-right: solid blue $\{54}px;
    background: $\{'white'};
    color: $\{'black'};
    display: $\{'block'};
    border-radius: $\{'3px'};
    padding: $\{'25px'};
    width: $\{'500px'};
    z-index: $\{100};
    font-size: $\{'18px'};
    text-align: $\{'center'};
    border-left: $\{p => p.theme.blue};
  \``,
    extract: false,
  },

  'random expressions': {
    code: `
      const a = () => css\`font-size: 1rem\`
      styled.h1\`
        margin: 12px 48px;
        \${css\`font-size: 32px\`};
        color: #ffffff;
        & .profile {
          \${props => props.prop && a()}
        }
        \${{ backgroundColor: "hotpink" }};
      \`
    `,
  },

  basic: {
    code: "const H1 = styled.h1`font-size: ${fontSize + 'px'};`",
    extract: false,
  },

  nested: {
    code:
      'const H1 = styled.h1`' +
      "font-size: ${fontSize + 'px'};" +
      '& div { color: blue;' +
      '& span { color: red } }' +
      '`',
    extract: false,
  },

  'interpolation in different places': {
    code: `
    const H1 = styled.h1\`
      font-size: \${fontSize + 'px'};
      height: 20px;
      transform: translateX(\${(props) => props.translateX});
      height1: \${something}wow;
      width: w\${something}ow;
      transform: translateX(\${(props) => props.translateX}) translateY(\${(props) => props.translateX});
      transform1: translateX(\${(props) => props.translateX}) translateY(\${(props) => props.translateX});
      transform2: translateX(\${(props) => props.translateX}) \${(props) => props.translateX};
      \``,
    extract: false,
  },

  'media query': {
    code:
      'const H1 = styled.h1`@media print {' +
      '  font-size: 10pt' +
      '}' +
      '@media screen {' +
      '  .child-selector { font-size: 13px }' +
      '}' +
      '@media screen, print {' +
      '  &:hover + & { line-height: 1.2 }' +
      '}' +
      '@media only screen ' +
      '  and (min-device-width: 320px) ' +
      '  and (max-device-width: 480px)' +
      '  and (-webkit-min-device-pixel-ratio: 2) {' +
      '    .child-selector { line-height: 1.4 }' +
      '}`',
  },

  'function call': {
    code: "styled(MyComponent)`font-size: ${fontSize + 'px'};`",
    extract: false,
  },

  'objects fn call': {
    code: `
    const H1 = styled('h1')({
      display: 'flex'
    })`,
    extract: false,
  },

  'objects based on props': {
    code: `
    const H1 = styled('h1')({ padding: 10 },props => ({
      display: props.display
    }))`,
    extract: false,
  },

  'shorthand property': {
    code: `const H1 = styled.h1({ fontSize })`,
    extract: false,
  },

  'objects prefixed': {
    code: `
    const H1 = styled('h1')({
      borderRadius: '50%',
      transition: 'transform 400ms ease-in-out',
      boxSizing: 'border-box',
      display: 'flex',
      ':hover': {
        transform: 'scale(1.2)'
      }
  }, props => {
      padding: props.padding
  })`,
    extract: false,
  },

  'styled. objects': {
    code: `
    const H1 = styled.h1({ padding: 10 },props => ({
      display: props.display
    }))`,
    extract: false,
  },

  'styled. objects with a single spread property': {
    code: `
    const defaultText = { fontSize: 20 }
    const Figure = styled.figure({
      ...defaultText
    })`,
    extract: false,
  },

  'styled. objects with a multiple spread properties': {
    code: `
    const defaultText = { fontSize: 20 }
    const Figure = styled.figure({
      ...defaultText,
      ...defaultFigure
    })`,
    extract: false,
  },

  'styled. objects with a multiple spread properties and other keys': {
    code: `
    const defaultText = { fontSize: 20 }
    const Figure = styled.figure({
      ...defaultText,
      fontSize: '20px',
      ...defaultFigure,
      ...defaultText2
    })`,
    extract: false,
  },

  'styled objects prefixed': {
    code: `
    const H1 = styled.h1({
      borderRadius: '50%',
      transition: 'transform 400ms ease-in-out',
      boxSizing: 'border-box',
      display: 'flex',
      ':hover': {
        transform: 'scale(1.2)'
      }
    },props => ({
      display: props.display
    }))`,
    extract: false,
  },

  'composition based on props': {
    code: `const cls1 = css\` width: 20px; \`
    const H1 = styled.h1\`
      $\{props => {
      return props.a ? cssA : cssB
    }};
      font-size: \${fontSize + 'px'};
      height: 20px;
      transform: translateX(\${(props) => props.translateX});
    \``,
  },

  hoisting: {
    code: `
      const Profile = () => {
        const H1 = styled.h1({
          borderRadius: '50%',
          transition: 'transform 400ms ease-in-out',
          boxSizing: 'border-box',
          display: 'flex',
          ':hover': {
            transform: 'scale(1.2)'
          }
        },props => ({
          display: props.display
        }),
          [{ color: 'blue' }]
        )
      }
    `,
    extract: false,

    opts: { hoist: true },
  },

  'variable import: no dynamic': {
    code: "import what from 'emotion'; what.h1`color:blue;`",
  },

  'config rename': {
    code: 'what.h1`color:blue;`',
    opts: { importedNames: { styled: 'what' } },
  },

  'autoLabel object styles': {
    code: `
      const Profile = () => {
        const H1 = styled.h1({
          borderRadius: '50%',
          transition: 'transform 400ms ease-in-out',
          boxSizing: 'border-box',
          display: 'flex',
          ':hover': {
            transform: 'scale(1.2)'
          }
        })
      }
    `,
    opts: { autoLabel: true },
    extract: false,
  },

  'autoLabel string styles': {
    code: `
        const Profile = () => {
          const ProfileH1 = styled('h1')\`
            color: blue;
          \`

          return <H1>Hello</H1>
        }
      `,
    opts: { autoLabel: true },
  },

  'component selector': {
    code: `
      const Child = styled.div\`
        color: red;
      \`;

      const SecondChild = Child.withComponent('span');

      const Parent = styled.div\`
        \${Child} {
          color: blue;
        }

        \${SecondChild} {
          color: pink;
        }
      \`;
    `,
  },

  'hash generation no file system': {
    code: 'styled.h1`color:blue;`',
    filename: '',
  },
}

createInlineTests('styled inline', cases)
createExtractTests('styled extract', cases)
