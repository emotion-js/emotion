import React from 'react'
import css from 'glam'

export const emotion = (tag, [cls, vars = []]) => props =>
  React.createElement(
    tag,
    Object.assign({}, props, {
      className: (props.className || '') +
        ' ' +
        css(
          cls,
          vars.map(v => (v && typeof v === 'function' ? v(props) : v))
        )
    })
  )
