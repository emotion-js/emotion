const path = require('path')
// const docs = require('./docs-yaml')()
// const packages = docs.filter(({ title }) => title === 'Packages')[0].items
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
global.Babel = require('babel-standalone')

const webpack = require('webpack')

exports.modifyWebpackConfig = ({ config, stage }) => {
  config.merge({
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

  config.plugin('ignore-stuff', () => new webpack.IgnorePlugin(/^(xor|props)$/))
  if (stage === 'build-javascript') {
    config.merge({
      plugins: [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          generateStatsFile: true
        })
      ]
    })
  }
}

exports.modifyBabelrc = ({ babelrc }) => {
  return {
    ...babelrc,
    plugins: babelrc.plugins.concat([
      [`transform-react-jsx`, { pragma: `___EmotionJSX` }],
      [
        'babel-plugin-jsx-pragmatic',
        {
          export: 'jsx',
          module: '@emotion/core',
          import: '___EmotionJSX'
        }
      ],
      process.env.NODE_ENV === 'production'
        ? ['@emotion/babel-plugin-core', { jsx: true }]
        : ['@emotion/babel-plugin-core', { sourceMap: true, jsx: true }]
    ])
  }
}

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
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
exports.onCreateNode = async ({
  node,
  boundActionCreators,
  getNode,
  loadNodeContent
}) => {
  const { createNodeField } = boundActionCreators

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
