import { addDefault, addNamed } from '@babel/helper-module-imports'

export function addImport(
  state: any,
  importPath: string,
  imported: string,
  nameHint?: string
) {
  let cacheKey = ['import', importPath, imported].join(':')
  if (state[cacheKey] === undefined) {
    let importIdentifier
    if (imported === 'default') {
      importIdentifier = addDefault(state.file.path, importPath, { nameHint })
    } else {
      importIdentifier = addNamed(state.file.path, imported, importPath, {
        nameHint
      })
    }
    state[cacheKey] = importIdentifier.name
  }
  return {
    type: 'Identifier',
    name: state[cacheKey]
  }
}
