import React from 'react'

export default function glam (tag, className) {
  return class Target extends React.Component {
    render () {
      return React.createElement(tag, { className })
    }
  }
}
