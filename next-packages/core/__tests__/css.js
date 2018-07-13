// @flow
/** @jsx jsx */
import { jsx, Global, keyframes } from '@emotion/core'
import Provider from '@emotion/provider'
import css from '@emotion/css'
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

test('keyframes', () => {
  const animation = keyframes(css`
    from {
      color: green;
    }
    to {
      color: hotpink;
    }
  `)
  const tree = renderer.create(
    <div>
      <div
        css={css`
          animation: ${animation.name} ${true};
          ${animation.styles};
        `}
      >
        {animation.name}
      </div>
    </div>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('keyframes insert in css call', () => {
  const animation = keyframes(css`
    from {
      color: green;
    }
    to {
      color: hotpink;
    }
  `)
  const tree = renderer.create(
    <div>
      <div
        css={css`
          animation: ${animation.name};
          ${animation.styles};
        `}
      >
        {animation.name}
      </div>
    </div>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('global', () => {
  const tree = renderer.create(
    <div>
      <Global
        styles={css`
          body {
            color: hotpink;
          }
        `}
      />
    </div>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('@font-face in global', () => {
  const tree = renderer.create(
    <div>
      <Global
        styles={{
          '@font-face': {
            fontFamily: 'some-name'
          }
        }}
      />
    </div>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('css call composition', () => {
  const first = css`
    color: hotpink;
  `
  const second = css({ ':hover': first })
  expect(second).toMatchSnapshot()
})

test('theming with the css prop', () => {
  const tree = renderer.create(
    <Provider theme={{ primary: 'hotpink' }}>
      <div css={theme => ({ color: theme.primary })} />
    </Provider>
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
