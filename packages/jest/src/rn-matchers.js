// @flow

/**
 * Jest test matchers for React Native only
 */

import chalk from 'chalk'

import { valueMatches } from './matchers'

function toHaveStyleRule(received: *, property: *, value: *) {
  let style

  if (typeof received.props === 'function') {
    // the received component is rendered by enzyme shallow()
    style = received
      .dive()
      .dive()
      .dive()
      .prop('style')
  } else {
    // the received component is rendered by native-testing-library
    style = received.props.style
  }

  if (!style) {
    return {
      pass: false,
      message: () => 'Received component has no styles.'
    }
  }

  let styleValue

  if (style instanceof Array) {
    // react native style props can be an array
    const styles = style.reduce(
      (allStyles, styleObj) => ({
        ...allStyles,
        ...styleObj
      }),
      {}
    )

    styleValue = styles[property]
  } else {
    styleValue = style[property]
  }

  if (!styleValue) {
    return {
      pass: false,
      message: () => `Property not found: ${property}`
    }
  }

  const pass = valueMatches({ value: styleValue }, value)

  return {
    pass,
    message: () =>
      `Expected ${property}${pass ? ' not ' : ' '}to match:\n` +
      `  ${chalk.green(value)}\n` +
      'Received:\n' +
      `  ${chalk.red(styleValue)}`
  }
}

export let matchers = { toHaveStyleRule }
