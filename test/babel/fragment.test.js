/* eslint-env jest */
import * as babel from 'babel-core'
import plugin from '../../src/babel'
import * as fs from 'fs'
jest.mock('fs')

fs.existsSync.mockReturnValue(true)

describe('babel fragment', () => {
  test('basic fragment', () => {
    const basic = `
      const frag = fragment\`color: green\`;
      styled.h1\`font-size: 20px; @apply \${frag};\``
    const { code } = babel.transform(basic, {
      plugins: [plugin]
    })
    expect(code).toMatchSnapshot()
  })

  test('fragment kitchen sink', () => {
    const basic = `
      const frag = fragment\`color: green; background-color: \${backgroundColor}\`;
      const frag1 = fragment\` width: 20px; name: some-frag-name; \`
      const frag2 = fragment\` height: 20px; @apply \${frag1}; \`
      styled.h1\`font-size: \${fontSize + 'px'}; name: some-name; @apply \${frag}; @apply \${frag2}\``
    const { code } = babel.transform(basic, {
      plugins: [plugin]
    })
    expect(code).toMatchSnapshot()
  })

  test('fragment with multiple selectors that should throw', () => {
    expect(() => {
      const basic = `
        const frag = fragment\`
          color: green;
          display: none;
          &:hover {
            color: yellow;
          }
          & .wow {
            color: purple;
          }
        \`;
      `
      babel.transform(basic, {
        plugins: [plugin]
      })
    }).toThrowErrorMatchingSnapshot()
  })
})
