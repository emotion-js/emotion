import { h } from 'preact'
import { css } from './index'

export default function (tag, cls, vars = [], content) {
  if (!tag) {
    throw new Error(
      'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
    )
  }

  function Styled (props) {
    const getValue = v => (v && typeof v === 'function' ? v.cls || v(props) : v)
    const className = css(
      cls.map(getValue),
      vars.map(getValue),
      content
    )

    return h(
      tag,
      Object.assign({}, props, {
        ref: props.innerRef,
        classname: `${className} ${props.classname || props.class || ''}`
      })
    )
  }

  const name = cls[0].split('-')[1]
  const componentTag = tag.displayName || tag.name || 'Component'
  Styled.displayName = `styled(${componentTag}${name})`
  Styled.cls = '.' + cls
  return Styled
}
