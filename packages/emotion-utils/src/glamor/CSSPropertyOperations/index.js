// @flow

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CSSPropertyOperations
 */
import dangerousStyleValue from './dangerousStyleValue'

function memoizeStringOnly<T>(callback: (s: string) => T): (s: string) => T {
  const cache = {}
  return function(string) {
    if (!cache.hasOwnProperty(string)) {
      cache[string] = callback.call(this, string)
    }
    return cache[string]
  }
}

const hyphenateRegex = /[A-Z]|^ms/g

export const processStyleName = memoizeStringOnly((styleName: string): string =>
  styleName.replace(hyphenateRegex, '-$&').toLowerCase()
)

if (process.env.NODE_ENV !== 'production') {
  const warning = require('fbjs/lib/warning')
  const camelizeStyleName = require('fbjs/lib/camelizeStyleName')
  // 'msTransform' is correct, but the other prefixes should be capitalized
  let badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/

  // style values shouldn't contain a semicolon
  let badStyleValueWithSemicolonPattern = /;\s*$/

  let warnedStyleNames = {}
  let warnedStyleValues = {}
  let warnedForNaNValue = false

  let warnHyphenatedStyleName = function(name, owner) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return
    }

    warnedStyleNames[name] = true
    process.env.NODE_ENV !== 'production'
      ? warning(
          false,
          'Unsupported style property %s. Did you mean %s?%s',
          name,
          camelizeStyleName(name),
          checkRenderMessage(owner)
        )
      : void 0
  }

  let warnBadVendoredStyleName = function(name, owner) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return
    }

    warnedStyleNames[name] = true
    process.env.NODE_ENV !== 'production'
      ? warning(
          false,
          'Unsupported vendor-prefixed style property %s. Did you mean %s?%s',
          name,
          name.charAt(0).toUpperCase() + name.slice(1),
          checkRenderMessage(owner)
        )
      : void 0
  }

  let warnStyleValueWithSemicolon = function(name, value, owner) {
    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
      return
    }

    warnedStyleValues[value] = true
    process.env.NODE_ENV !== 'production'
      ? warning(
          false,
          "Style property values shouldn't contain a semicolon.%s " +
            'Try "%s: %s" instead.',
          checkRenderMessage(owner),
          name,
          value.replace(badStyleValueWithSemicolonPattern, '')
        )
      : void 0
  }

  let warnStyleValueIsNaN = function(name, value, owner) {
    if (warnedForNaNValue) {
      return
    }

    warnedForNaNValue = true
    process.env.NODE_ENV !== 'production'
      ? warning(
          false,
          '`NaN` is an invalid value for the `%s` css style property.%s',
          name,
          checkRenderMessage(owner)
        )
      : void 0
  }

  let checkRenderMessage = function(owner) {
    if (owner) {
      let name = owner.getName()
      if (name) {
        return ' Check the render method of `' + name + '`.'
      }
    }
    return ''
  }

  /**
   * @param {string} name
   * @param {*} value
   * @param {ReactDOMComponent} component
   */
  var warnValidStyle = function(name, value, component) {
    // eslint-disable-line no-var
    let owner
    if (component) {
      owner = component._currentElement._owner
    }
    if (name.indexOf('-') > -1) {
      warnHyphenatedStyleName(name, owner)
    } else if (badVendoredStyleNamePattern.test(name)) {
      warnBadVendoredStyleName(name, owner)
    } else if (badStyleValueWithSemicolonPattern.test(value)) {
      warnStyleValueWithSemicolon(name, value, owner)
    }

    if (typeof value === 'number' && isNaN(value)) {
      warnStyleValueIsNaN(name, value, owner)
    }
  }
}

/**
   * Serializes a mapping of style properties for use as inline styles:
   *
   *   > createMarkupForStyles({width: '200px', height: 0})
   *   "width:200px;height:0;"
   *
   * Undefined values are ignored so that declarative programming is easier.
   * The result should be HTML-escaped before insertion into the DOM.
   *
   * @param {object} styles
   * @param {ReactDOMComponent} component
   * @return {?string}
   */

export function createMarkupForStyles(styles: {
  [string]: any
}): string | null {
  let serialized = ''
  for (let styleName in styles) {
    const isCustomProp = styleName.indexOf('--') === 0
    if (!styles.hasOwnProperty(styleName)) {
      continue
    }
    let styleValue = styles[styleName]
    if (process.env.NODE_ENV !== 'production' && !isCustomProp) {
      warnValidStyle(styleName, styleValue)
    }
    if (styleValue != null) {
      if (isCustomProp) {
        serialized += `${styleName}:${styleValue};`
      } else {
        serialized += processStyleName(styleName) + ':'
        serialized += dangerousStyleValue(styleName, styleValue) + ';'
      }
    }
  }
  return serialized || null
}
