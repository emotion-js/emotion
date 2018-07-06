'use strict';

exports.__esModule = true;
exports.makeSourceMapGenerator = makeSourceMapGenerator;
exports.addSourceMaps = addSourceMaps;

var _sourceMap = require('source-map');

var _convertSourceMap = require('convert-source-map');

var _convertSourceMap2 = _interopRequireDefault(_convertSourceMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getGeneratorOpts(file) {
  return file.opts.generatorOpts ? file.opts.generatorOpts : file.opts;
}

function makeSourceMapGenerator(file) {
  var generatorOpts = getGeneratorOpts(file);
  var filename = generatorOpts.sourceFileName;
  var generator = new _sourceMap.SourceMapGenerator({
    file: filename,
    sourceRoot: generatorOpts.sourceRoot
  });

  generator.setSourceContent(filename, file.code);
  return generator;
}

function addSourceMaps(offset, state) {
  var generator = makeSourceMapGenerator(state.file);
  var generatorOpts = getGeneratorOpts(state.file);
  generator.addMapping({
    generated: {
      line: 1,
      column: 0
    },
    source: generatorOpts.sourceFileName,
    original: offset
  });
  return _convertSourceMap2.default.fromObject(generator).toComment({ multiline: true });
}