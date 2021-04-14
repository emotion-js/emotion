/** @jsx jsx */
import { jsx, css } from '@emotion/react'

const SomeComponent = () => (
  <div
    className={css`
      color: pink;
      label: iChenLei;
    `}
  />
)

const OtherComponent = () => (
  <div
    className={css({
      color: 'blue',
      label: 'iChenLei'
    })}
  />
)
