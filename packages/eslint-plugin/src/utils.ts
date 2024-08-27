import { ESLintUtils } from '@typescript-eslint/utils'
import { parse as parsePath } from 'path'

const { version } = require('../package.json')

export const REPO_URL = 'https://github.com/emotion-js/emotion'

export interface EmotionESLintPluginDocs {
  recommended: boolean
}

export const createRule = ESLintUtils.RuleCreator<EmotionESLintPluginDocs>(
  name => {
    const ruleName = parsePath(name).name

    return `${REPO_URL}/blob/@emotion/eslint-plugin@${version}/packages/eslint-plugin/docs/rules/${ruleName}.md`
  }
)
