/**
 * @fileoverview Apply eslint rules to emotion.sh css-in-js
 * @author alex-pex
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

// ------------------------------------------------------------------------------
// Plugin Definition
// ------------------------------------------------------------------------------

// import all rules in src/rules

import syntaxPreference from './rules/syntax-preference'

export const rules = {
  'syntax-preference': syntaxPreference
}
