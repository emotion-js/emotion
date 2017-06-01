import React from 'react'

const h = React.createElement

export default function glam (tag, className, {filename} = {}) {
  return class Target extends React.Component {
    render () {
      return h(tag, {
        ...this.props,
        className: (this.props.className || '') + ' ' + className
      })
    }
  }
}
