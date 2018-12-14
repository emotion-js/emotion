// @flow
import chalk from 'chalk'
import * as css from 'css'
import {
  getClassNamesFromNodes,
  getStylesFromClassNames,
  getStyleElements,
  RULE_TYPES
} from './utils'

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

const mediaRegex = /(\([a-z-]+:)\s?([a-z0-9.]+\))/g

function hasClassNames(classNames, selectors, target) {
  return selectors.some(selector => {
    if (target === '') {
      return classNames.includes(selector.slice(1))
    }
    return selector.includes(target)
  })
}

function toHaveStyleRule(
  received: *,
  property: *,
  value: *,
  options?: { target?: string, media?: string }
) {
  const { target = '', media = '' } = options ? options : {}
  const classNames = getClassNamesFromNodes([received])
  const cssString = getStylesFromClassNames(classNames, getStyleElements())
  const styles = css.parse(cssString)

  let preparedRules = styles.stylesheet.rules
  if (media.length > 1) {
    if (mediaRegex.test(media)) {
      preparedRules = preparedRules
        .filter(rule => {
          let a = rule.media
            ? rule.media.replace(/\s/g, '').includes(media.replace(/\s/g, ''))
            : false
          return rule.type === RULE_TYPES.media && a
        })
        .reduce((mediaRules, mediaRule) => {
          let b = mediaRules.concat(mediaRule.rules)
          return b
        }, [])
    } else {
      return {
        pass: false,
        message: () => `Invalid media: ${media}`
      }
    }
  }
  const declaration = preparedRules
    .filter(
      rule =>
        rule.type === RULE_TYPES.rule &&
        hasClassNames(classNames, rule.selectors, target)
    )
    .reduce((decs, rule) => decs.concat(rule.declarations), [])
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

export let matchers = { toHaveStyleRule }
