const path = require('path')
const docs = require('./docs-yaml')

const packages = docs.filter(({ title }) => title === 'Packages')[0].items

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
  docs.forEach(({ title, items }) => {
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
            visit(markdownAST, 'link', node => {
              node.url = node.url.replace(/^https?:\/\/emotion.sh\//, '')
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
          // Remove the title from the markdown if it's a package
          hast.children.shift()
        }
        return hast
      }
    }
  }
}
