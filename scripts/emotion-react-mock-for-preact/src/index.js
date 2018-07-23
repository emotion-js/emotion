// @flow
import { Component } from 'preact'
import { type Node } from 'react'
// from https://github.com/jamiebuilds/create-react-context but with stuff we don't need removed and changed to only support preact

type RenderFn<T> = (value: T) => Node

type ProviderProps<T> = {
  value: T,
  children?: Node
}

type ConsumerProps<T> = {
  children: [RenderFn<T>],
  observedBits?: number
}

type ConsumerState<T> = {
  value: T
}

type Provider<T> = Component<ProviderProps<T>>
type Consumer<T> = Component<ConsumerProps<T>, ConsumerState<T>>

type Context<T> = {
  Provider: Class<Provider<T>>,
  Consumer: Class<Consumer<T>>
}

// https://github.com/styled-components/styled-components/blob/e05b3fe247e9d956bcde786cec376e32afb85bca/src/utils/create-broadcast.js
const createEventEmitter = (state: any) => {
  const listeners: { [number]: Function | void } = {}
  let id = 0

  return {
    set(nextState) {
      state = nextState

      for (const key in listeners) {
        // $FlowFixMe
        const listener = listeners[key]
        if (listener === undefined) {
          continue
        }

        listener(state)
      }
    },
    on(listener: any) {
      const currentId = id
      listeners[currentId] = listener
      id += 1
      listener(state)
      return currentId
    },
    off(unsubID: number) {
      listeners[unsubID] = undefined
    },
    get() {
      return state
    }
  }
}

export function createContext<T>(defaultValue: T): Context<T> {
  const contextProp =
    '__emotion-preact-context-' + Math.random().toString(36) + '__'

  class Provider extends Component<ProviderProps<T>> {
    emitter = createEventEmitter(this.props.value)

    getChildContext() {
      return {
        [contextProp]: this.emitter
      }
    }

    componentWillReceiveProps(nextProps) {
      // not using Object.is like the actual createContext since we don't care about the cases where they differ
      if (this.props.value !== nextProps.value) {
        this.emitter.set(nextProps.value)
      }
    }

    render() {
      return this.props.children
    }
  }

  class Consumer extends Component<ConsumerProps<T>, ConsumerState<T>> {
    observedBits: number
    constructor(props, context) {
      super(props, context)
      let value
      if (this.context[contextProp] !== undefined) {
        value = this.context[contextProp].get()
      } else {
        value = defaultValue
      }
      this.state = { value }
    }

    componentDidMount() {
      if (this.context[contextProp] !== undefined) {
        this.context[contextProp].on(this.onUpdate)
      }
    }

    componentWillUnmount() {
      if (this.context[contextProp] !== undefined) {
        this.context[contextProp].off(this.onUpdate)
      }
    }

    onUpdate = newValue => {
      if (newValue !== this.state.value) {
        this.setState({ value: newValue })
      }
    }

    render() {
      return this.props.children[0](this.state.value)
    }
  }

  return {
    Provider,
    Consumer
  }
}

export const forwardRef = render => render

export * from 'preact'

export { default } from 'preact'
