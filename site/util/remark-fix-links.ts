import { visit } from 'unist-util-visit'

export function remarkFixLinks() {
  return (markdownAST: any) => {
    visit(markdownAST, 'link', (node: { url: string }) => {
      node.url = node.url.replace(/^https?:\/\/emotion.sh/i, '')
      node.url = node.url.replace(
        /^https?:\/\/github.com\/emotion-js\/emotion\/tree\/main/i,
        ''
      )

      if (!node.url.startsWith('http')) {
        node.url = node.url
          .replace(/\.mdx?(#.*)?$/, (_, hash) => {
            return hash || ''
          })
          .replace(/^\/packages\//, '/docs/@emotion/')
      }
    })
  }
}
