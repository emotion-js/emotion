// @flow
import * as React from 'react'
import 'test-utils/next-env'
import { ClassNames, ThemeProvider, css as reactCss } from '@emotion/react'
import renderer from 'react-test-renderer'

test('css', () => {
  const tree = renderer.create(
    <ClassNames>
      {({ css }) => (
        <div
          className={css`
            color: hotpink;
          `}
        />
      )}
    </ClassNames>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

it('should get the theme', () => {
  const tree = renderer.create(
    <ThemeProvider theme={{ color: 'green' }}>
      <ClassNames>
        {({ css, theme }) => (
          <div
            className={css`
              color: ${theme.color};
            `}
          />
        )}
      </ClassNames>
    </ThemeProvider>
  )
  expect(tree.toJSON()).toMatchSnapshot()
})

test('cx - correct styles order', () => {
  const tree = renderer.create(
    <ClassNames>
      {({ css, cx }) => {
        let secondClassButItsInsertedFirst = css`
          color: green;
        `
        let firstClassButItsInsertedSecond = css`
          color: hotpink;
        `

        return (
          <div
            className={cx(
              firstClassButItsInsertedSecond,
              'some-other-class',
              secondClassButItsInsertedFirst
            )}
          />
        )
      }}
    </ClassNames>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('cx - single registered class', () => {
  const tree = renderer.create(
    <ClassNames>
      {({ css, cx }) => {
        return (
          <div
            className={cx(
              css`
                color: hotpink;
              `,
              'some-other-class'
            )}
          />
        )
      }}
    </ClassNames>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('cx - compose opaque styles object basic', () => {
  const fooStyles = reactCss`color: hotpink;`

  const tree = renderer.create(
    <ClassNames>
      {({ cx }) => <div className={cx(fooStyles, 'other-class')} />}
    </ClassNames>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('cx - compose opaque style object with registered class name in correct order ', () => {
  const fooStyles = reactCss`color: hotpink;`

  const tree = renderer.create(
    <ClassNames>
      {({ cx, css }) => (
        <div
          className={cx(
            css`
              color: red;
            `,
            fooStyles
          )}
        >
          Should be hotpink.
        </div>
      )}
    </ClassNames>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('css and cx throws when used after render', () => {
  let cx, css
  renderer.create(
    <ClassNames>
      {arg => {
        ;({ cx, css } = arg)
        return null
      }}
    </ClassNames>
  )

  expect(cx).toThrowErrorMatchingInlineSnapshot(
    `"cx can only be used during render"`
  )
  expect(css).toThrowErrorMatchingInlineSnapshot(
    `"css can only be used during render"`
  )
})
