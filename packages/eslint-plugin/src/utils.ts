import { ESLintUtils } from '@typescript-eslint/experimental-utils'
import { parse as parsePath } from 'path'

const { version } = require('../package.json')

export const REPO_URL = 'https://github.com/emotion-js/emotion'

export const createRule = ESLintUtils.RuleCreator(name => {
  const ruleName = parsePath(name).name

  return `${REPO_URL}/blob/@emotion/eslint-plugin@${version}/packages/eslint-plugin/docs/rules/${ruleName}.md`
})

// This is based off of RuleModule from `@typescript-eslint/experimental-utils`.
// All exported rules should use this type to prevent the error:
//
// TS2742: The inferred type of 'rules' cannot be named without a reference to
// '@typescript-eslint/experimental-utils/node_modules/@typescript-eslint/types/dist/ast-spec'.
// This is likely not portable. A type annotation is necessary.
//
// Really, there is no need to generate TypeScript declarations for this
// package, but there does not seem to be a way to disable declaration
// generation when using Preconstruct
export interface EmotionESLintRule {
  meta: unknown
  create(context: unknown): unknown
}
