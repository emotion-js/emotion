// Press ctrl+space for code completion
export default function transformer(file, api) {
  const j = api.jscodeshift
  let reactEmotionImportSource = 'react-emotion'
  let emotionImportSource = 'emotion'
  // change this to @emotion/styled.macro if you want to use that
  let newStyledImportSource = '@emotion/styled.macro'

  let quote = 'single'

  return j(file.source)
    .find(j.ImportDeclaration, {
      source: { value: reactEmotionImportSource }
    })
    .forEach(path => {
      if (path.value.source.raw.charAt(0) === '"') {
        quote = 'double'
      }
      if (
        path.value.specifiers.length === 1 &&
        path.value.specifiers[0].type === 'ImportDefaultSpecifier'
      ) {
        path.value.source.value = newStyledImportSource
      } else {
        let defaultImportSpecifierIndex = path.value.specifiers.findIndex(
          val => val.type === 'ImportDefaultSpecifier'
        )
        path.value.source.value = emotionImportSource

        if (defaultImportSpecifierIndex !== -1) {
          let index = path.parentPath.value.indexOf(path.value)
          path.parentPath.value.splice(
            index,
            0,
            j.importDeclaration(
              [path.value.specifiers[defaultImportSpecifierIndex]],
              j.literal(newStyledImportSource)
            )
          )
          path.value.specifiers.splice(defaultImportSpecifierIndex, 1)
        }
      }
    })
    .toSource({ quote })
}
