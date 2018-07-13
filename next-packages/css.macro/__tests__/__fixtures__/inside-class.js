/** @jsx jsx */
import { Component } from 'react'
import jsx from '@emotion/jsx'
import css from '@emotion/css.macro'

class SomeComponent extends Component {
  render() {
    return (
      <div
        css={css`
          color: hotpink;
        `}
      />
    )
  }
}
