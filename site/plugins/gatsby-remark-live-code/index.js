const visit = require('unist-util-visit')
const escapeGoat = require('escape-goat')
const Babel = require('@babel/standalone')

const babelPresetEnv = require('@babel/preset-env').default
const babelPresetReact = require('@babel/preset-react').default
const babelPluginEmotion = require('babel-plugin-emotion').default

let livePattern = /^\s*\/\/ @live/

module.exports = ({ markdownAST }) => {
  visit(markdownAST, `code`, node => {
    if (node.lang === 'jsx live') {
      throw new Error(
        `The following code block has the language jsx live which is no longer allowed:\n${
          node.value
        }`
      )
    }
    if (
      node.lang === 'jsx' &&
      // yes, i know this won't work if you don't use line comments and stuff
      // but adding a whole js parser and stuff to do this would be more effort than it's worth
      livePattern.test(node.value)
    ) {
      let cleanValue = node.value.replace('// @live', '').trim()
      node.type = `html`
      node.value = escapeGoat.escapeTag`<live-code code="${cleanValue}" compiled="${
        Babel.transform(cleanValue, {
          presets: [babelPresetEnv, babelPresetReact],
          plugins: [[babelPluginEmotion, { sourceMap: false }]]
        }).code
      }"></live-code>`
    }
  })
}
