// @flow
import * as React from 'react'
import 'test-utils/next-env'
import { Style } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import renderer from 'react-test-renderer'

test('css', () => {
  const tree = renderer.create(
    <Style>
      {({ css }) => (
        <div
          className={css`
            color: hotpink;
          `}
        />
      )}
    </Style>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

it('should get the theme', () => {
  const tree = renderer.create(
    <ThemeProvider theme={{ color: 'green' }}>
      <Style>
        {({ css, theme }) => (
          <div
            className={css`
              color: ${theme.color};
            `}
          />
        )}
      </Style>
    </ThemeProvider>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('cx', () => {
  const tree = renderer.create(
    <Style>
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
    </Style>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('css and cx throws when used after render', () => {
  let cx, css
  renderer.create(
    <Style>
      {arg => {
        ;({ cx, css } = arg)
        return null
      }}
    </Style>
  )

  expect(cx).toThrowErrorMatchingInlineSnapshot(
    `"cx can only be used during render"`
  )
  expect(css).toThrowErrorMatchingInlineSnapshot(
    `"css can only be used during render"`
  )
})
