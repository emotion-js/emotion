/**
 * @fileoverview Apply eslint rules to emotion.sh css-in-js
 * @author alex-pex
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const requireIndex = require('requireindex')

// ------------------------------------------------------------------------------
// Plugin Definition
// ------------------------------------------------------------------------------

// import all rules in src/rules
module.exports.rules = requireIndex(`${__dirname}/rules`)
