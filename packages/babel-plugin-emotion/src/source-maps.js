import { SourceMapGenerator } from 'source-map'
import convert from 'convert-source-map'

export const makeSourceMapGenerator = file => {
  const filename = file.opts.sourceFileName
  const generator = new SourceMapGenerator({
    file: filename,
    sourceRoot: file.opts.sourceRoot
  })

  generator.setSourceContent(filename, file.code)
  return generator
}

export const addSourceMaps = (code, generator, filename) =>
  [
    code,
    convert.fromObject(generator).toComment({multiline: true}),
    `/*@ sourceURL=${filename} */`
  ].join('\n')

let generator
let filename
let offset

// https://github.com/zeit/styled-jsx/blob/160643ec6b6a5ad5d51f33591a61ac49ba88dff8/src/lib/style-transform.js#L24
export function sourceMapsPlugin (...args) {
  const [context, , , , line, column, length] = args
  // Pre-processed, init source map
  if (context === -1 && generator !== undefined) {
    generator.addMapping({
      generated: {
        line: 1,
        column: 0
      },
      source: filename,
      original: offset
    })

    return
  }

  // Post-processed
  if (context === -2 && generator !== undefined) {
    generator = undefined
    offset = undefined
    filename = undefined

    return
  }

  // Selector/property, update source map
  if ((context === 1 || context === 2) && generator !== undefined) {
    generator.addMapping({
      generated: {
        line: 1,
        column: length
      },
      source: filename,
      original: {
        line: line + offset.line,
        column: column + offset.column
      }
    })
  }
}
