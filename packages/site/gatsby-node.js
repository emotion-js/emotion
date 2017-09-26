const path = require('path')
const slash = require(`slash`)

exports.modifyBabelrc = ({ babelrc }) => {
  if (process.env.NODE_ENV !== 'production') {
    return {
      plugins: [
        [require.resolve(`babel-plugin-emotion`), { sourceMap: true }]
      ].concat(babelrc.plugins)
    }
  }
  return {
    plugins: [require.resolve(`babel-plugin-emotion`)].concat(babelrc.plugins)
  }
}
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
    const blogPostTemplate = path.resolve(`src/templates/doc.js`)
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

      // Create blog posts pages.
      console.log(result)
      result.data.allMarkdownRemark.edges.forEach(edge => {
        createPage({
          path: `docs/${edge.node.fields.slug}`, // required
          component: slash(blogPostTemplate),
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
exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (
    node.internal.type === `MarkdownRemark` &&
    typeof node.slug === `undefined`
  ) {
    const fileNode = getNode(node.parent)
    console.log(fileNode)
    createNodeField({
      node,
      name: `slug`,
      value: fileNode.name
    })
  }
}
