const path = require('path')
const { promisify } = require('util')
const fs = require('fs')
const yaml = require('js-yaml')
const yamlPath = path.resolve(__dirname, '../../docs/docs.yaml')
const packages = require('./packages')
const readFile = promisify(fs.readFile)

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

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  const docTemplate = require.resolve(`./src/templates/doc.js`)
  const [result, yamlContents] = await Promise.all([
    graphql(
      `
        {
          allMarkdownRemark(
            filter: { fileAbsolutePath: { glob: "**/docs/*.md" } }
          ) {
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
    ),
    readFile(yamlPath, { encoding: 'utf-8' })
  ])
  const docsInYaml = yaml
    .safeLoad(yamlContents.toString())
    .reduce((prev, current) => {
      return prev.concat(current.items)
    }, [])

  if (result.errors) {
    console.log(result.errors)
  }
  result.data.allMarkdownRemark.edges.forEach(edge => {
    if (docsInYaml.indexOf(edge.node.fields.slug) === -1) {
      throw new Error(
        `${edge.node.fields
          .slug}.md found in docs folder but not in docs/index.yaml, please add it to docs/index.yaml`
      )
    }
    createPage({
      path: `docs/${edge.node.fields.slug}`,
      component: docTemplate,
      context: {
        slug: edge.node.fields.slug
      }
    })
  })
  const packageTemplate = require.resolve('./src/templates/packages')
  packages.forEach(pkgName => {
    createPage({
      path: `packages/${pkgName}`,
      component: packageTemplate,
      context: {
        slug: pkgName
      }
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

// https://github.com/Skoli-Code/skoli-app-template/blob/8262fd0f1db12164b627cce8efefc9390a0c63ea/plugins/remark-custom-elements/extend-node-type.js

const parse = require('remark-parse')
const unified = require('unified')
const { GraphQLString } = require('graphql')
const GraphQLJSON = require('graphql-type-json')
const frontmatter = require('remark-frontmatter')
const customElementCompiler = require('@dumpster/remark-custom-element-to-hast')
const visit = require(`unist-util-visit`)
const toString = require(`mdast-util-to-string`)
const slugs = require(`github-slugger`)()
const remark = require('remark')

const ATTRIBUTE_TO_JSX = {
  'accept-charset': 'acceptCharset',
  accesskey: 'accessKey',
  allowfullscreen: 'allowFullScreen',
  allowtransparency: 'allowTransparency',
  autocomplete: 'autoComplete',
  autofocus: 'autoFocus',
  autoplay: 'autoPlay',
  cellpadding: 'cellPadding',
  cellspacing: 'cellSpacing',
  charset: 'charSet',
  class: 'className',
  classid: 'classId',
  colspan: 'colSpan',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  crossorigin: 'crossOrigin',
  enctype: 'encType',
  for: 'htmlFor',
  formaction: 'formAction',
  formenctype: 'formEncType',
  formmethod: 'formMethod',
  formnovalidate: 'formNoValidate',
  formtarget: 'formTarget',
  frameborder: 'frameBorder',
  hreflang: 'hrefLang',
  'http-equiv': 'httpEquiv',
  inputmode: 'inputMode',
  keyparams: 'keyParams',
  keytype: 'keyType',
  marginheight: 'marginHeight',
  marginwidth: 'marginWidth',
  maxlength: 'maxLength',
  mediagroup: 'mediaGroup',
  minlength: 'minLength',
  novalidate: 'noValidate',
  radiogroup: 'radioGroup',
  readonly: 'readOnly',
  rowspan: 'rowSpan',
  spellcheck: 'spellCheck',
  srcdoc: 'srcDoc',
  srclang: 'srcLang',
  srcset: 'srcSet',
  tabindex: 'tabIndex',
  usemap: 'useMap'
}

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  if (type.name !== 'MarkdownRemark') {
    return {}
  }
  return {
    tagline: {
      type: GraphQLString,
      resolve(node) {
        return new Promise(resolve => {
          remark()
            .use(() => markdownAST => {
              resolve(markdownAST.children[1].children[0].children[0].value)
            })
            .processSync(node.internal.content)
        })
      }
    },
    hast: {
      type: GraphQLJSON,
      resolve(node) {
        const hast = unified()
          .use(parse)
          .use(frontmatter, ['yaml'])
          .use(() => markdownAST => {
            // if (node.fields.slug === 'README') {
            //   console.log(markdownAST)
            // }
            visit(markdownAST, 'code', node => {
              if (node.lang === 'jsx live') {
                node.lang = 'jsx-live'
              }
            })
          })
          .use(customElementCompiler)
          .processSync(node.internal.content).contents
        slugs.reset()

        visit(hast, 'element', node => {
          if (
            node.tagName === 'pre' &&
            node.children.length === 1 &&
            node.children[0].tagName === 'code'
          ) {
            node.tagName = 'code'
            node.properties = node.children[0].properties
            node.children = node.children[0].children
          }
          for (const key of Object.keys(node.properties)) {
            if (ATTRIBUTE_TO_JSX[key] !== undefined) {
              node.properties[ATTRIBUTE_TO_JSX[key]] = node.properties[key]
              delete node.properties[key]
            }
          }
          if (node.properties.style !== undefined) {
            node.properties.style = node.properties.style
              .split(';')
              .map(val => val.split(':'))
              .reduce((prev, current) => {
                prev[current[0]] = current[1]
                return prev
              }, {})
          }
          switch (node.tagName) {
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6': {
              node.properties.id = slugs.slug(toString(node))
            }
          }
        })
        if (packages.indexOf(node.fields.slug) !== -1) {
          hast.children.shift()
          hast.children.shift()
          hast.children.shift()
        }
        return hast
      }
    }
  }
}
