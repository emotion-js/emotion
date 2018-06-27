// @flow
import chalk from 'chalk'
import * as css from 'css'
import { getClassNamesFromNodes } from './utils'
import type { Emotion } from 'create-emotion'

/*
 * Taken from
 * https://github.com/facebook/jest/blob/be4bec387d90ac8d6a7596be88bf8e4994bc3ed9/packages/expect/src/jasmine_utils.js#L234
 */
function isA(typeName, value) {
  return Object.prototype.toString.apply(value) === `[object ${typeName}]`
}

/*
 * Taken from
 * https://github.com/facebook/jest/blob/be4bec387d90ac8d6a7596be88bf8e4994bc3ed9/packages/expect/src/jasmine_utils.js#L36
 */
function isAsymmetric(obj) {
  return obj && isA('Function', obj.asymmetricMatch)
}

function valueMatches(declaration, value) {
  if (value instanceof RegExp) {
    return value.test(declaration.value)
  }

  if (isAsymmetric(value)) {
    return value.asymmetricMatch(declaration.value)
  }

  return value === declaration.value
}

function getStylesFromClassNames(classNames: Array<string>, emotion) {
  return Object.keys(emotion.caches.registered).reduce((styles, className) => {
    let indexOfClassName = classNames.indexOf(className)
    if (indexOfClassName !== -1) {
      let nameWithoutKey = classNames[indexOfClassName].substring(
        emotion.caches.key.length + 1
      )
      // $FlowFixMe
      styles += emotion.caches.inserted[nameWithoutKey]
    }
    return styles
  }, '')
}

export function createMatchers(emotion: Emotion) {
  function toHaveStyleRule(received: *, property: *, value: *) {
    const selectors = getClassNamesFromNodes([received])
    const cssString = getStylesFromClassNames(selectors, emotion)
    const styles = css.parse(cssString)

    const declaration = styles.stylesheet.rules
      .reduce((decs, rule) => Object.assign([], decs, rule.declarations), [])
      .filter(dec => dec.type === 'declaration' && dec.property === property)
      .pop()

    if (!declaration) {
      return {
        pass: false,
        message: () => `Property not found: ${property}`
      }
    }

    const pass = valueMatches(declaration, value)

    const message = () =>
      `Expected ${property}${pass ? ' not ' : ' '}to match:\n` +
      `  ${chalk.green(value)}\n` +
      'Received:\n' +
      `  ${chalk.red(declaration.value)}`

    return {
      pass,
      message
    }
  }

  return {
    toHaveStyleRule
  }
}
