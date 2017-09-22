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
      plugins: [[plugin, { sourceMap: true }]],
      filename: 'css.source-map.test.js'
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
      plugins: [[plugin, { sourceMap: true }]],
      filename: 'styled.source-map.test.js'
    })

    expect(code).toMatchSnapshot()
  })
})
