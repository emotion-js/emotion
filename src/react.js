import React from 'react'
import { css as magic } from './index'

export function styled (tag, cls, vars = [], content) {
  if (!tag) {
    throw new Error(
      'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
    )
  }

  function Styled (props) {
    const className = magic(
      cls,
      vars.map(v => (v && typeof v === 'function' ? v(props) : v)),
      content
    )

    return React.createElement(
      tag,
      Object.assign({}, props, {
        ref: props.innerRef,
        className: props.className
          ? className + ' ' + props.className
          : className
      })
    )
  }

  const [name] = cls.split('-')
  const debugName = name === 'css' ? '' : `.${name}`
  const componentTag = tag.displayName || tag.name || 'Component'
  Styled.displayName = `styled(${componentTag}${debugName})`

  return Styled
}

export function Style ({children, css, render}) {
  let fn = typeof render === 'function'
    ? render
    : Array.isArray(children) ? children[0] : children
  return fn(magic(css))
}
