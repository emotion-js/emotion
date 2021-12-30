import { visit } from 'unist-util-visit'
import { htmlEscape } from 'escape-goat'

const liveRegex = /^\s*\/\/ @live/

interface CodeNode {
  type: string
  lang?: string | null
  value?: string | null
}

export function remarkLiveEditor() {
  return (markdownAST: any) =>
    visit(markdownAST, 'code', (node: CodeNode) => {
      if (
        node.lang === 'jsx' &&
        // This won't work if you don't use line comments but adding a whole
        // JS parser would be overkill
        node.value &&
        liveRegex.test(node.value)
      ) {
        const code = node.value.replace('// @live', '').trim()
        node.type = `html`

        // Make sure there is no leading/trailing whitespace in this string - it
        // will result in an <undefined> HTML element
        node.value = htmlEscape`<live-editor code="${code}" language="${node.lang}"></live-editor>`
      }
    })
}
