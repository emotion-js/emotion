import importFromEmotion from './rules/import-from-emotion'
import noVanilla from './rules/no-vanilla'
import syntaxPreference from './rules/syntax-preference'
import styledImport from './rules/styled-import'
import jsxImport from './rules/jsx-import'
import pkgRenaming from './rules/pkg-renaming'

const { name, version } = require('../package.json')

export const rules = {
  'import-from-emotion': importFromEmotion,
  'no-vanilla': noVanilla,
  'syntax-preference': syntaxPreference,
  'styled-import': styledImport,
  'jsx-import': jsxImport,
  'pkg-renaming': pkgRenaming
}

const plugin = {
  meta: {
    name,
    version
  },
  rules
}

export default plugin
