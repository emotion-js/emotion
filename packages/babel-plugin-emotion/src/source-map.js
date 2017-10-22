import { SourceMapGenerator } from 'source-map'
import convert from 'convert-source-map'

export function makeSourceMapGenerator(file) {
  const filename = file.opts.sourceFileName
  const generator = new SourceMapGenerator({
    file: filename,
    sourceRoot: file.opts.sourceRoot
  })

  generator.setSourceContent(filename, file.code)
  return generator
}

export function addSourceMaps(offset, state) {
  const generator = makeSourceMapGenerator(state.file)
  generator.addMapping({
    generated: {
      line: 1,
      column: 0
    },
    source: state.file.opts.sourceFileName,
    original: offset
  })
  return convert.fromObject(generator).toComment({ multiline: true })
}
