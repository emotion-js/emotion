// @flow

import importFromEmotion from './rules/import-from-emotion'
import noVanilla from './rules/no-vanilla'
import syntaxPreference from './rules/syntax-preference'
import styledImport from './rules/styled-import'
import jsxImport from './rules/jsx-import'
import pkgRenaming from './rules/pkg-renaming'

export let configs = {
  react: {
    'import-from-emotion': 'error',
    'jsx-import': 'error',
    'no-vanilla': 'error',
    'styled-import': 'error'
  }
}

export let rules = {
  'import-from-emotion': importFromEmotion,
  'jsx-import': jsxImport,
  'no-vanilla': noVanilla,
  'pkg-renaming': pkgRenaming,
  'styled-import': styledImport,
  'syntax-preference': syntaxPreference
}
