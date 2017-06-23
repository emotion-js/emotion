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
          ? props.className + ' ' + className
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
