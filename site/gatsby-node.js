const path = require('path')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
global.Babel = require('babel-standalone')

exports.onCreateWebpackConfig = ({ stage, actions, plugins, getConfig }) => {
  actions.setWebpackConfig({
    // xor and props are for react-live and cosmiconfig is for babel-plugin-macros
    plugins: [plugins.ignore(/^(xor|props|cosmiconfig)$/)],
    resolve: {
      alias: {
        assert: 'fbjs/lib/emptyFunction',
        'source-map': 'fbjs/lib/emptyFunction',
        '@babel/types': path.join(__dirname, './src/utils/babel-types'),
        'buble/dist/buble.deps': path.join(__dirname, './src/utils/transform')
      }
    },
    node: {
      fs: 'empty',
      buffer: 'empty',
      assert: 'empty'
    }
  })
  const config = getConfig()
  actions.replaceWebpackConfig({
    ...config,
    output: {
      ...config.output,
      // this doesn't seem to always merge correctly with `setWebpackConfig` for some reason
      // so i'm setting it here
      // this is here because it defaults to window and is used for hot reloading and other stuff
      // so if this wasn't here, the web worker would break
      // since it would try to access window
      globalObject: 'this'
    },
    module: {
      ...config.module,
      rules: config.module.rules.filter(rule => {
        // eslint is annoying
        return rule.enforce !== 'pre'
      })
    }
  })

  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      plugins: [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static'
        })
      ]
    })
  }
}

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.sourceNodes = async ({ store, cache, actions, createNodeId }) => {
  await createRemoteFileNode({
    url: `https://raw.githubusercontent.com/emotion-js/awesome-emotion/master/README.md`,
    store,
    cache,
    createNode: actions.createNode,
    createNodeId
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const docs1 = require('./docs-yaml')()
  const docTemplate = require.resolve(`./src/templates/doc.js`)
  docs1.forEach(({ title, items }) => {
    items.forEach(itemName => {
      createPage({
        path: `docs/${itemName}`,
        component: docTemplate,
        context: {
          slug: itemName
        }
      })
    })
  })
}

// Add custom url pathname for blog posts.
exports.onCreateNode = async ({ node, actions, getNode, loadNodeContent }) => {
  const { createNodeField } = actions

  if (
    node.internal.type === `MarkdownRemark` &&
    typeof node.slug === `undefined`
  ) {
    const fileNode = getNode(node.parent)

    const splitAbsolutePath = fileNode.absolutePath.split(path.sep)
    createNodeField({
      node,
      name: `slug`,
      value:
        fileNode.name === 'README'
          ? splitAbsolutePath[splitAbsolutePath.length - 2]
          : fileNode.name
    })
  }
}
