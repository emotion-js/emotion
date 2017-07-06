import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'
import { createStore } from 'smitty'
import isPlainObject from 'is-plain-object'

export const CHANNEL = '__emotion__'

const SUB = 'emotion/SUB'
const UNSUB = 'emotion/UNSUB'
const UPDATE = 'emotion/UPDATE'

function buildStore (theme = {}) {
  const store = createStore({
    theme,
    subs: []
  })

  store.createActions({
    subscribe: instance => {
      return (emit, state) => {
        emit(SUB, instance)
        return () => emit(UNSUB, instance)
      }
    },
    unsubscribe: UNSUB,
    updateTheme: UPDATE
  })

  store.handleActions({
    [SUB] (state, payload) {
      state.subs.push(payload)
    },
    [UNSUB] (state, payload) {
      const index = state.subs.indexOf(payload)
      if (index > -1) {
        state.subs.slice(index, 1)
      }
    },
    [UPDATE] (state, payload) {
      for (let i = 0; i < state.subs.length; ++i) {
        state.subs[i].setTheme(payload)
      }
    }
  })
  return store
}

export default class ThemeProvider extends Component {
  store

  componentWillMount () {
    if (this.context[CHANNEL]) {
      const outerStore = this.context[CHANNEL]
      this.unsubscribeToOuter = outerStore.actions.subscribe(this)
    }

    this.store = buildStore(this.getTheme())
  }

  componentWillUnmount () {
    this.unsubscribeToOuter()
  }

  getChildContext () {
    return {...this.context, [CHANNEL]: this.store}
  }

  render () {
    if (!this.props.children) {
      return null
    }

    console.log(this.store)

    return Children.only(this.props.children)
  }

  // Get the theme from the props, supporting both (outerTheme) => {} as well as object notation
  getTheme = (passedTheme) => {
    const theme = passedTheme || this.props.theme
    const outerTheme = this.store ? this.store.state.theme : {}
    if (typeof theme === 'function') {
      const mergedTheme = theme(outerTheme)
      if (!isPlainObject(mergedTheme)) {
        throw new Error('[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!')
      }
      return mergedTheme
    }
    if (!isPlainObject(theme)) {
      throw new Error('[ThemeProvider] Please make your theme prop a plain object')
    }
    return {...outerTheme, ...(theme)}
  }
}

ThemeProvider.childContextTypes = {
  [CHANNEL]: PropTypes.object.isRequired
}
ThemeProvider.contextTypes = {
  [CHANNEL]: PropTypes.object
}
