import React from 'react'
import css from 'glam'

const h = React.createElement

export default function glam (tag, [cls, vars]) {
  return class Target extends React.Component {
    render () {
      const finalClassName = css(
        cls,
        vars.map(v => (typeof v === 'function' ? v(this.props) : v))
      )

      return h(tag, {
        ...this.props,
        className: (this.props.className || '') + ' ' + finalClassName
      })
    }
  }
}
