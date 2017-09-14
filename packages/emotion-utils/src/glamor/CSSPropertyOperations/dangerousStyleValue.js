// @flow
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule dangerousStyleValue
 */

import isUnitlessNumber from './CSSProperty'

/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @param {ReactDOMComponent} component
 * @return {string} Normalized style value with dimensions applied.
 */

export default function dangerousStyleValue(
  name: string,
  value: string
): string {
  let isEmpty = value == null || typeof value === 'boolean' || value === ''
  if (isEmpty) {
    return ''
  }

  let isNonNumeric = isNaN(value)
  if (isNonNumeric || value === 0 || isUnitlessNumber[name] === 1) {
    return '' + value // cast to string
  }

  if (typeof value === 'string') {
    value = value.trim()
  }
  return value + 'px'
}
