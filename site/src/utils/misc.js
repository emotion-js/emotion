// @flow
export function getDocMap(
  edges: Array<{
    node: {
      fields: {
        slug: string
      },
      frontmatter: {
        title: string
      }
    }
  }>
) {
  const docMap: { [string]: string } = {}
  edges.forEach(({ node }) => {
    if (node.fields === null) {
      return
    }
    docMap[node.fields.slug] = node.frontmatter.title
  })
  return docMap
}

export const docList: Array<{
  title: string,
  items: Array<string>
  // $FlowFixMe
}> = require('../../../docs/docs.yaml')
