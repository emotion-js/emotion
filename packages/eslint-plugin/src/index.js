// @flow

import importFromEmotion from './rules/import-from-emotion'
import noVanilla from './rules/no-vanilla'
import syntaxPreference from './rules/syntax-preference'
import styledImport from './rules/styled-import'
import jsxImport from './rules/jsx-import'
import pkgRenaming from './rules/pkg-renaming'

export let rules = {
  'import-from-emotion': importFromEmotion,
  'no-vanilla': noVanilla,
  'syntax-preference': syntaxPreference,
  'styled-import': styledImport,
  'jsx-import': jsxImport,
  'pkg-renaming': pkgRenaming
}
