const path = require('path')
// const docs = require('./docs-yaml')()
// const packages = docs.filter(({ title }) => title === 'Packages')[0].items
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
global.Babel = require('babel-standalone')

// const webpack = require('webpack')

exports.onCreateWebpackConfig = ({ stage, actions, plugins, getConfig }) => {
  // console.log(.module.rules)
  actions.setWebpackConfig({
    plugins: [plugins.ignore(/^(xor|props)$/)],
    resolve: {
      modules: ['node_modules'],
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
    module: {
      ...config.module,
      rules: config.module.rules.filter(rule => {
        // eslint is annoying
        return rule.enforce !== 'pre'
      })
    }
  })
  console.log(getConfig().module.rules)
  // getConfig().module.rules.forEach(rule => {
  //   console.log(rule, rule.use)
  // })

  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      plugins: [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          generateStatsFile: true
        })
      ]
    })
  }
}

// exports.modifyBabelrc = ({ babelrc }) => {
//   return {
//     ...babelrc,
//     plugins: babelrc.plugins.concat([
//       [`transform-react-jsx`, { pragma: `___EmotionJSX` }],
//       [
//         'babel-plugin-jsx-pragmatic',
//         {
//           export: 'jsx',
//           module: '@emotion/core',
//           import: '___EmotionJSX'
//         }
//       ],
//       process.env.NODE_ENV === 'production'
//         ? ['@emotion/babel-plugin-core', { jsx: true }]
//         : ['@emotion/babel-plugin-core', { sourceMap: true, jsx: true }]
//     ])
//   }
// }

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
