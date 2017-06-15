import React from 'react'
import magic from 'glam'

export const styled = (tag, [cls, vars = [], content]) => props => {
  const className = magic(
    cls,
    vars.map(v => (v && typeof v === 'function' ? v(props) : v)),
    content
  )

  return React.createElement(
    tag,
    Object.assign({}, props, {
      className: props.className ? props.className + ' ' + className : className
    })
  )
}
