import { visit } from 'unist-util-visit'

export function remarkFixLinks() {
  return (markdownAST: any) => {
    visit(markdownAST, 'link', (node: { url: string }) => {
      node.url = node.url.replace(/^https?:\/\/emotion.sh/, '')

      if (!node.url.startsWith('//') && !node.url.startsWith('http')) {
        node.url = node.url
          .replace(/\.mdx?(#.*)?$/, (_, hash) => {
            return hash || ''
          })
          .replace(/^\/packages\//, '/docs/@emotion/')
      }
    })
  }
}

export function remarkResponsiveTables() {
  return (markdownAST: any) => {
    visit(markdownAST, 'mdxJsxFlowElement', (node: any) => {
      if (node.name === 'table') {
        node.name = 'ResponsiveTable'
      }
    })
  }
}
