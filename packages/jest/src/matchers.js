// @flow
import chalk from 'chalk'
import { compile } from 'stylis'
import * as specificity from 'specificity'
import {
  getClassNamesFromNodes,
  getStylesFromClassNames,
  getStyleElements,
  hasClassNames,
  getMediaRules,
  findLast
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
    return value.test(declaration.children)
  }

  if (isAsymmetric(value)) {
    return value.asymmetricMatch(declaration.children)
  }

  return value === declaration.children
}

function toHaveStyleRule(
  received: *,
  property: *,
  value: *,
  options?: { target?: string, media?: string } = {}
) {
  const { target, media } = options
  const classNames = getClassNamesFromNodes([received])
  const cssString = getStylesFromClassNames(classNames, getStyleElements())
  let preparedRules = compile(cssString)
  if (media) {
    preparedRules = getMediaRules(preparedRules, media)
  }
  const result = preparedRules
    .filter(
      rule =>
        rule.type === 'rule' && hasClassNames(classNames, rule.props, target)
    )
    .reduce((acc, rule) => {
      const lastMatchingDeclaration = findLast(
        rule.children,
        dec => dec.type === 'decl' && dec.props === property
      )
      if (!lastMatchingDeclaration) {
        return acc
      }
      return acc.concat(
        rule.props.map(selector => ({
          selector,
          declaration: lastMatchingDeclaration
        }))
      )
    }, [])
    .sort(({ selector: selectorA }, { selector: selectorB }) =>
      specificity.compare(selectorA, selectorB)
    )
    .pop()

  if (!result) {
    return {
      pass: false,
      message: () => `Property not found: ${property}`
    }
  }

  const { declaration } = result
  const pass = valueMatches(declaration, value)

  const message = () =>
    `Expected ${property}${pass ? ' not ' : ' '}to match:\n` +
    `  ${chalk.green(value)}\n` +
    'Received:\n' +
    `  ${chalk.red(declaration.children)}`

  return {
    pass,
    message
  }
}

export let matchers = { toHaveStyleRule }
