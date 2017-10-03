const path = require('path')
const crypto = require(`crypto`)

global.Babel = require('babel-standalone')

exports.modifyWebpackConfig = ({ config }) => {
  config.merge({
    resolve: {
      alias: {
        'buble/dist/buble.deps': path.join(__dirname, './src/utils/transform'),
        // used by a dependency of react-live
        xor$: 'component-xor',
        props$: 'component-props'
      }
    },
    node: {
      fs: 'empty'
    }
  })
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogPostTemplate = require.resolve(`./src/templates/doc.js`)
    graphql(
      `
        {
          allMarkdownRemark(limit: 1000) {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }
      `
    ).then(result => {
      if (result.errors) {
        console.log(result.errors)
      }
      result.data.allMarkdownRemark.edges.forEach(edge => {
        createPage({
          path: `docs/${edge.node.fields.slug}`,
          component: blogPostTemplate,
          context: {
            slug: edge.node.fields.slug
          }
        })
      })

      resolve()
    })
  })
}

// Add custom url pathname for blog posts.
exports.onCreateNode = async ({
  node,
  boundActionCreators,
  getNode,
  loadNodeContent
}) => {
  const {
    createNodeField,
    createNode,
    createParentChildLink
  } = boundActionCreators

  if (
    node.internal.type === `MarkdownRemark` &&
    typeof node.slug === `undefined`
  ) {
    const fileNode = getNode(node.parent)
    createNodeField({
      node,
      name: `slug`,
      value: fileNode.name
    })
  } else if (node.internal.type === 'File' && node.extension === 'example') {
    const content = await loadNodeContent(node)

    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(content))
      .digest(`hex`)

    const codeExampleNode = {
      id: `${node.id} >>> CodeExample`,
      children: [],
      parent: node.id,
      content,
      name: node.name,
      internal: {
        content,
        contentDigest,
        type: `CodeExample`
      }
    }
    createNode(codeExampleNode)
    createParentChildLink({ parent: node, child: codeExampleNode })
  }
}
