import React from 'react'
import magic from 'glam'

export const styled = (tag, [cls, vars = [], content]) => props =>
  React.createElement(
    tag,
    Object.assign({}, props, {
      className:
        (props.className || '') +
          ' ' +
        magic(
            cls,
            vars.map(v => (v && typeof v === 'function' ? v(props) : v)),
            content
          )
    })
  )
