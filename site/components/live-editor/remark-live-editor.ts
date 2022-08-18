import { visit } from 'unist-util-visit'

const liveRegex = /^\s*\/\/ @live/

interface CodeNode {
  type: string
  lang?: string | null
  value?: string | null

  name?: string | null
  attributes?: { type: 'mdxJsxAttribute'; name: string; value: string }[]
}

export function remarkLiveEditor() {
  return (markdownAST: any) => {
    visit(markdownAST, 'code', (node: CodeNode) => {
      if (
        node.lang === 'jsx' &&
        // This won't work if you don't use line comments but adding a whole
        // JS parser would be overkill
        node.value &&
        liveRegex.test(node.value)
      ) {
        const code = node.value.replace('// @live', '').trim()

        node.type = 'mdxJsxFlowElement'
        node.name = 'EmotionLiveEditor'
        node.attributes = [
          { type: 'mdxJsxAttribute', name: 'code', value: code }
        ]
      }
    })
  }
}
