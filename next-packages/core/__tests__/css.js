// @flow
/** @jsx jsx */
import 'test-utils/next-env'
import { jsx, css } from '@emotion/core'
import ThemeProvider from '@emotion/provider'
import renderer from 'react-test-renderer'

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
          display: ['green', 'hotpink']
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
