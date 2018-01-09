import PropTypes from 'prop-types'
import React, { Component, PureComponent } from 'react'

import { channel } from 'emotion-theming'

export const getContextTypes = C => C.contextTypes
export const getChannel = C => Object.keys(getContextTypes(C))[0]

export const mountOptions = broadcast => ({
  childContextTypes: {
    [channel]: PropTypes.object.isRequired,
  },
  context: {
    [channel]: {
      subscribe: broadcast.subscribe,
      unsubscribe: broadcast.unsubscribe,
    },
  },
})

export function getInterceptor(initialState) {
  let state = initialState
  return newState => {
    if (newState) {
      state = newState
    }
    return state
  }
}

export const StatelessComp = props => <div {...props} />

StatelessComp.displayName = 'StatelessComp'

export class Pure extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  render() {
    return <div>{this.props.children}</div>
  }
}

export class PropTrap extends Component {
  static propTypes = {
    intercept: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
    this.props.intercept(props.theme)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.props.intercept(nextProps.theme)
    }
  }
  // eslint-disable-next-line
  render() {
    return <div />
  }
}

export class ContextTrap extends Component {
  static propTypes = {
    intercept: PropTypes.func.isRequired,
  }
  static contextTypes = {
    [channel]: PropTypes.object.isRequired,
  }
  componentWillMount() {
    if (this.context[channel]) {
      this.unsubscribe = this.context[channel].subscribe(this.props.intercept)
    }
  }
  // eslint-disable-next-line
  render() {
    return <div />
  }
}

export const Trap = {
  Prop: PropTrap,
  Context: ContextTrap,
}
