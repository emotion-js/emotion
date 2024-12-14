/** @jsx jsx */
import 'test-utils/setup-env'
import { safeQuerySelector } from 'test-utils'
import React from 'react'
import { jsx, css, Global, CacheProvider, ThemeProvider } from '@emotion/react'
import { render } from '@testing-library/react'
import createCache from '@emotion/cache'

console.error = jest.fn()
console.warn = jest.fn()

beforeEach(() => {
  delete globalThis.EMOTION_RUNTIME_AUTO_LABEL
})

afterEach(() => {
  jest.clearAllMocks()
  safeQuerySelector('body').innerHTML = ''
})

const SomeComponent = (props /*: { lol: true } */) => (props.lol ? 'yes' : 'no')

// test to make sure flow prop errors work.
// should probably try to make it so that components that require className props
// and have the css prop passed to them don't have type errors
;<SomeComponent /> // eslint-disable-line no-unused-expressions

test('thing', () => {
  const { container } = render(
    <div>
      <div css={{ display: 'flex' }}>something</div>
    </div>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('css call composition', () => {
  let first = css`
    color: hotpink;
  `
  let { container } = render(<div css={css({ '&:hover': first })} />)

  expect(container.firstChild).toMatchSnapshot()
})

test('theming with the css prop', () => {
  const { container } = render(
    <ThemeProvider theme={{ primary: 'hotpink' }}>
      <div css={theme => ({ color: theme.primary })} />
    </ThemeProvider>
  )
  expect(container.firstChild).toMatchSnapshot()
})

test('theming with the array css prop', () => {
  const { container } = render(
    <ThemeProvider theme={{ primary: 'hotpink' }}>
      <div css={[theme => ({ color: theme.primary }), { display: 'flex' }]} />
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('object with false', () => {
  const { container } = render(
    <div>
      <div css={{ color: 'hotpink', display: false }}>something</div>
    </div>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('label in css call', () => {
  const { container } = render(
    <div>
      <div
        css={css`
          color: hotpink;
          label: this-is-hotpink;
        `}
      >
        something
      </div>
    </div>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('string as css prop throws', () => {
  expect(() => {
    render(
      <div>
        <div
          css={`
            color: hotpink;
          `}
        >
          something
        </div>
      </div>
    )
  }).toThrowErrorMatchingSnapshot()
})

test('array fallback', () => {
  const { container } = render(
    <div>
      <div
        css={{
          color: ['green', 'hotpink']
        }}
      >
        something
      </div>
    </div>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('array fallback (using camelCased property)', () => {
  const { container } = render(
    <div>
      <div
        css={{
          backgroundColor: ['green', 'hotpink']
        }}
      >
        something
      </div>
    </div>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('nested at rule', () => {
  const { container } = render(
    <div
      css={{
        '@media (min-width: 980px)': {
          backgroundColor: 'blue',
          '@supports (width: 100vw)': {
            backgroundColor: 'red'
          }
        }
      }}
    >
      something
    </div>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('can set speedy via custom cache', () => {
  let cache = createCache({ key: 'speedy-test', speedy: true })

  render(
    <CacheProvider value={cache}>
      <div
        css={{
          color: 'hotpink'
        }}
      >
        <span css={{ color: 'yellow' }}>wow</span>
        something
      </div>
    </CacheProvider>
  )

  expect(cache.sheet.tags).toHaveLength(1)
})

test('speedy option from a custom cache is inherited for <Global/> styles', () => {
  let cache = createCache({
    key: 'global-inherit-speedy',
    container: safeQuerySelector('body'),
    speedy: true
  })

  render(
    <CacheProvider value={cache}>
      <Global styles={{ html: { fontSize: 16 } }} />
    </CacheProvider>
  )

  expect(safeQuerySelector('body style').textContent).toEqual('')
})

test('does not autoLabel without babel or EMOTION_RUNTIME_AUTO_LABEL', () => {
  let SomeComp = props => {
    return (
      <div
        {...props}
        css={{
          color: 'hotpink'
        }}
      >
        something
      </div>
    )
  }
  const { container } = render(<SomeComp />)

  expect(container.firstChild.className).toMatch(/css-[^-]+/)
})

test('autoLabel without babel', () => {
  globalThis.EMOTION_RUNTIME_AUTO_LABEL = true

  let SomeComp = props => {
    return (
      <div
        {...props}
        css={{
          color: 'hotpink'
        }}
      >
        something
      </div>
    )
  }
  const { container } = render(<SomeComp />)

  expect(container.firstChild.className.endsWith('-SomeComp')).toBe(true)
})

test('autoLabel without babel (sanitized)', () => {
  globalThis.EMOTION_RUNTIME_AUTO_LABEL = true

  let SomeComp$ = props => {
    return (
      <div {...props} css={{ color: 'hotpink' }}>
        something
      </div>
    )
  }

  // eslint-disable-next-line react/jsx-pascal-case
  const { container } = render(<SomeComp$ />)

  expect(container.firstChild.className.endsWith('-SomeComp-')).toBe(true)
})

test('overwrite styles from parent', () => {
  let SomeComponent = (props /*: Object */) => (
    <div
      css={{
        color: 'green',
        backgroundColor: 'yellow'
      }}
      {...props}
    />
  )
  const { container } = render(
    <SomeComponent
      css={{
        color: 'hotpink'
      }}
    />
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('child selector array', () => {
  const { container } = render(
    <div
      css={{
        '&:hover': [{ color: 'green' }, { backgroundColor: 'yellow' }]
      }}
    />
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('handles camelCased custom properties in object styles properly', () => {
  const { container } = render(
    <div
      css={{
        '--textColor': 'green',
        color: 'var(--textColor)'
      }}
    />
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('applies class when css prop is set to nil on wrapper component', () => {
  const Button = props => <button css={{ color: 'hotpink' }} {...props} />

  const WrappedButton /*: React.StatelessFunctionalComponent<any> */ = (
    { children, buttonStyles } /*: {
    children: React$Node,
    buttonStyles?: null
  } */
  ) => <Button css={buttonStyles}>{children}</Button>

  const { container } = render(
    <React.Fragment>
      <WrappedButton>{"I'm hotpink!"}</WrappedButton>
      <WrappedButton buttonStyles={null}>{"I'm hotpink too!"}</WrappedButton>
    </React.Fragment>
  )

  expect(container).toMatchSnapshot()
})

test('handles composition of styles without a final semi in a declaration block', () => {
  const { container } = render(
    <div
      css={[
        // prettier-ignore
        css`
          color: hotpink
        `,
        css`
          background-color: green;
        `
      ]}
    >
      {"I'm hotpink on the green background."}
    </div>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('handles composition of an array css prop containing no final semi with cssprop-generated className (runtime variant of #1730)', () => {
  const Child = ({ bgColor, ...props }) => (
    <div
      css={[{ width: 100, height: 100 }, `background-color: ${bgColor}`]}
      {...props}
    />
  )
  const Parent = ({ children }) => (
    <Child bgColor="green" css={{ color: 'hotpink' }}>
      {children}
    </Child>
  )
  const { container } = render(
    <Parent>{"I'm hotpink on the green background."}</Parent>
  )

  expect(container.firstChild).toMatchSnapshot()
})

it("doesn't try to insert invalid rules caused by object style's value being falsy", () => {
  render(
    <CacheProvider value={createCache({ key: 'invalid-rules', speedy: true })}>
      <h1
        css={css({ color: 'hotpink', '@media (min-width 800px)': undefined })}
      >
        {'Emotion'}
      </h1>
    </CacheProvider>
  )

  expect(console.error.mock.calls).toMatchInlineSnapshot(`[]`)
  expect(console.warn.mock.calls).toMatchInlineSnapshot(`[]`)
})
