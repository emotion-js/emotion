import React from 'react'
import { css } from './index'

export default function (tag, cls, vars = [], content) {
  if (!tag) {
    throw new Error(
      'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
    )
  }

  function Styled (props) {
    const className = css(
      cls,
      vars.map(v => (v && typeof v === 'function' ? v.cls || v(props) : v)),
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
  Styled.className = '.' + cls
  return Styled
}
