import * as babel from 'babel-core'
import plugin from 'babel-plugin-emotion'

describe('source maps', () => {
  test('css source map', () => {
    const basic = `
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
      \``
    const { code } = babel.transform(basic, {
      babelrc: false,
      plugins: [[plugin, { sourceMap: true }]],
      filename: 'css.source-map.test.js'
    })
    expect(code).toMatchSnapshot()
  })
  test('styled object styles source map', () => {
    const basic = `
      styled('div')({
        color: 'blue',
        '&:hover': {
          '& .name': {
            color: 'amethyst',
            '&:focus': {
              color: 'burlywood',
              [mq[0]]: {
                color: 'rebeccapurple'
              }
            }
          },
          color: 'green'
        }
      })
    `
    const { code } = babel.transform(basic, {
      babelrc: false,
      plugins: [[plugin, { sourceMap: true }]],
      filename: 'css-nested.source-map.test.js'
    })
    expect(code).toMatchSnapshot()
  })

  test('styled source map', () => {
    const basic = `const Avatar = styled('img')\`
        width: 96px;
        height: 96px;

        border-radius: $\{props =>
          props.theme.borderRadius};

        border: 1px solid $\{props =>
          props.theme.borderColor};
      \``

    const { code } = babel.transform(basic, {
      babelrc: false,
      plugins: [[plugin, { sourceMap: true }]],
      filename: 'styled.source-map.test.js'
    })

    expect(code).toMatchSnapshot()
  })

  test('fontFace source map', () => {
    const basic = `
      fontFace\`
        font-family: MyHelvetica;
        src: local("Helvetica Neue Bold"),
             local("HelveticaNeue-Bold"),
             url(MgOpenModernaBold.ttf);
        font-weight: bold;
    \`;`

    const { code } = babel.transform(basic, {
      babelrc: false,
      plugins: [[plugin, { sourceMap: true }]],
      filename: 'fontFace.source-map.test.js'
    })
    expect(code).toMatchSnapshot()
  })
  test('css prop', () => {
    const basic = `
    <div
      css={\`
        width: 128px;
        height: 128px;
        background-color: #8c81d8;
        border-radius: 4px;
  
        & img {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          transition: all 400ms ease-in-out;
  
          &:hover {
            transform: scale(1.2);
          }
        }
      \`}
    />
  `
    const { code } = babel.transform(basic, {
      babelrc: false,
      plugins: [[plugin, { sourceMap: true }]],
      filename: 'site.source-map.test.js'
    })
    expect(code).toMatchSnapshot()
  })
})
