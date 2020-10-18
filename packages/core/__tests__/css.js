// @flow
/** @jsx jsx */
import 'test-utils/next-env'
import * as React from 'react'
import { jsx, css, CacheProvider } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import createCache from '@emotion/cache'

// $FlowFixMe
console.error = jest.fn()
// $FlowFixMe
console.warn = jest.fn()

afterEach(() => {
  jest.clearAllMocks()
})

const SomeComponent = (props: { lol: true }) => (props.lol ? 'yes' : 'no')

// test to make sure flow prop errors work.
// should probably try to make it so that components that require className props
// and have the css prop passed to them don't have type errors
// $FlowFixMe
;<SomeComponent /> // eslint-disable-line no-unused-expressions

test('thing', () => {
  const tree = renderer.create(
    <div>
      <div css={{ display: 'flex' }}>something</div>
    </div>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('css call composition', () => {
  let first = css`
    color: hotpink;
  `
  let tree = renderer.create(<div css={css({ ':hover': first })} />)

  expect(tree.toJSON()).toMatchSnapshot()
})

test('theming with the css prop', () => {
  const tree = renderer.create(
    <ThemeProvider theme={{ primary: 'hotpink' }}>
      <div css={theme => ({ color: theme.primary })} />
    </ThemeProvider>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('object with false', () => {
  const tree = renderer.create(
    <div>
      <div css={{ color: 'hotpink', display: false }}>something</div>
    </div>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('label in css call', () => {
  const tree = renderer.create(
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

  expect(tree.toJSON()).toMatchSnapshot()
})

test('string as css prop throws', () => {
  expect(() => {
    renderer.create(
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
  const tree = renderer.create(
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

  expect(tree.toJSON()).toMatchSnapshot()
})

test('array fallback (using camelCased property)', () => {
  const tree = renderer.create(
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

  expect(tree.toJSON()).toMatchSnapshot()
})

test('nested at rule', () => {
  const tree = renderer.create(
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

  expect(tree.toJSON()).toMatchSnapshot()
})

test('can set speedy via custom cache', () => {
  let cache = createCache({ speedy: true })
  renderer.create(
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

test('autoLabel without babel', () => {
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
  const tree = renderer.create(<SomeComp />)

  expect(tree.toJSON().props.className.endsWith('-SomeComp')).toBe(true)
})

test('autoLabel without babel (sanitized)', () => {
  let SomeComp$ = props => {
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
  const tree = renderer.create(<SomeComp$ />)

  expect(tree.toJSON().props.className.endsWith('-SomeComp-')).toBe(true)
})

test('overwrite styles from parent', () => {
  let SomeComponent = (props: Object) => (
    <div
      css={{
        color: 'green',
        backgroundColor: 'yellow'
      }}
      {...props}
    />
  )
  const tree = renderer.create(
    <SomeComponent
      css={{
        color: 'hotpink'
      }}
    />
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('child selector array', () => {
  const tree = renderer.create(
    <div
      css={{
        ':hover': [{ color: 'green' }, { backgroundColor: 'yellow' }]
      }}
    />
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('handles camelCased custom properties in object styles properly', () => {
  const tree = renderer.create(
    <div
      css={{
        '--textColor': 'green',
        color: 'var(--textColor)'
      }}
    />
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('applies class when css prop is set to nil on wrapper component', () => {
  const Button = (props: any) => (
    <button css={{ color: 'hotpink' }} {...props} />
  )
  const WrappedButton = ({
    children,
    buttonStyles
  }: {
    children: React$Node,
    buttonStyles?: null
  }) => <Button css={buttonStyles}>{children}</Button>

  const tree = renderer.create(
    <React.Fragment>
      <WrappedButton>{"I'm hotpink!"}</WrappedButton>
      <WrappedButton buttonStyles={null}>{"I'm hotpink too!"}</WrappedButton>
    </React.Fragment>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('handles composition of styles without a final semi in a declaration block', () => {
  const tree = renderer.create(
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

  expect(tree.toJSON()).toMatchSnapshot()
})

it("doesn't try to insert invalid rules caused by object style's value being falsy", () => {
  render(
    <CacheProvider value={createCache({ speedy: true })}>
      <h1
        css={css({ color: 'hotpink', '@media (min-width 800px)': undefined })}
      >
        {'Emotion'}
      </h1>
    </CacheProvider>
  )

  expect((console.error: any).mock.calls).toMatchInlineSnapshot(`Array []`)
  expect((console.warn: any).mock.calls).toMatchInlineSnapshot(`Array []`)
})
