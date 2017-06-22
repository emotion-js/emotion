import React from 'react'
import { css } from './index'

export default function (tag, cls, vars = [], content) {
  function Styled (props) {
    const className = css(
      cls,
      vars.map(v => (v && typeof v === 'function' ? v(props) : v)),
      content
    )

    return React.createElement(
      tag,
      Object.assign({}, props, {
        className: props.className
          ? props.className +
          ' ' +
          className
          : className
      })
    )
  }

  Styled.displayName = `Styled[${typeof tag === 'string' ? tag : tag.displayName || 'Wrapped'}](${cls})`

  return Styled
}
