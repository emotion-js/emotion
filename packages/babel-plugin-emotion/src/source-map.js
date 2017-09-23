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

export function addSourceMaps(code, generator, filename) {
  return [
    code,
    convert.fromObject(generator).toComment({ multiline: true }),
    `/*@ sourceURL=${filename} */`
  ].join('\n')
}
