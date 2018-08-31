// @flow
import * as React from 'react'
import 'test-utils/next-env'
import { ClassNames } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
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

test('cx', () => {
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
