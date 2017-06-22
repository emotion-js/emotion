import React from 'react'
import { css } from './index'

export const styled = (tag, cls, vars = [], content) => props => {
  const className = css(
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
