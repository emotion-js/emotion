import 'test-utils/setup-env'
import React from 'react'
import { ClassNames, ThemeProvider } from '@emotion/react'
import { render } from '@testing-library/react'

test('css', () => {
  const { container } = render(
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

  expect(container.firstChild).toMatchSnapshot()
})

test('should get the theme', () => {
  const { container } = render(
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
  expect(container.firstChild).toMatchSnapshot()
})

test('cx', () => {
  const { container } = render(
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

  expect(container.firstChild).toMatchSnapshot()
})

test('css and cx throws when used after render', () => {
  let cx, css
  render(
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
