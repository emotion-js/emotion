import postcssJs from 'postcss-js'
import Input from 'postcss/lib/input'
import { expandCSSFallbacks, processor } from './parser'
import { forEach, reduce } from 'emotion-utils'
import { getFilename } from './index'

function prefixAst(args, t, path) {
  function isLiteral(value) {
    return (
      t.isStringLiteral(value) ||
      t.isNumericLiteral(value) ||
      t.isBooleanLiteral(value)
    )
  }

  if (Array.isArray(args)) {
    return args.map(element => prefixAst(element, t, path))
  }

  if (t.isObjectExpression(args)) {
    let properties = []
    args.properties.forEach(property => {
      // nested objects
      if (t.isObjectExpression(property.value)) {
        const key = property.computed
          ? property.key
          : t.isStringLiteral(property.key)
            ? t.stringLiteral(property.key.value)
            : t.identifier(property.key.name)

        const prefixedPseudoSelectors = {
          '::placeholder': [
            '::-webkit-input-placeholder',
            '::-moz-placeholder',
            ':-ms-input-placeholder'
          ],
          ':fullscreen': [
            ':-webkit-full-screen',
            ':-moz-full-screen',
            ':-ms-fullscreen'
          ]
        }

        const prefixedValue = prefixAst(property.value, t, path)

        if (!property.computed) {
          if (prefixedPseudoSelectors[key.value]) {
            forEach(prefixedPseudoSelectors[key.value], prefixedKey => {
              properties.push(
                t.objectProperty(
                  t.stringLiteral(prefixedKey),
                  prefixedValue,
                  false
                )
              )
            })
          }
        }

        return properties.push(
          t.objectProperty(key, prefixedValue, property.computed)
        )
      } else if (
        // literal value or array of literal values
        isLiteral(property.value) ||
        (t.isArrayExpression(property.value) &&
          property.value.elements.every(isLiteral))
      ) {
        // bail on computed properties
        if (property.computed) {
          properties.push(property)
          return
        }

        // handle array values: { display: ['flex', 'block'] }
        const propertyValue = t.isArrayExpression(property.value)
          ? property.value.elements.map(element => element.value)
          : property.value.value

        const style = { [property.key.name]: propertyValue }
        const parsedStyle = postcssJs.parse(style)
        parsedStyle.source = {}
        parsedStyle.source.input = new Input(parsedStyle.toString(), {
          from: getFilename(path)
        })
        const prefixedStyle = expandCSSFallbacks(processor(parsedStyle))

        for (let k in prefixedStyle) {
          const key = t.isStringLiteral(property.key)
            ? t.stringLiteral(k)
            : t.identifier(k)
          const val = prefixedStyle[k]
          let value

          if (typeof val === 'number') {
            value = t.numericLiteral(val)
          } else if (typeof val === 'string') {
            value = t.stringLiteral(val)
          } else if (Array.isArray(val)) {
            value = t.arrayExpression(val.map(i => t.stringLiteral(i)))
          }

          properties.push(t.objectProperty(key, value))
        }

        // expressions
      } else {
        properties.push(property)
      }
    })

    return t.objectExpression(properties)
  }

  if (t.isArrayExpression(args)) {
    return t.arrayExpression(prefixAst(args.elements, t, path))
  }

  return args
}

export default class ASTObject {
  props: Array<any>
  expressions: Array<any>
  composesCount: number
  t: any

  constructor(props, expressions, composesCount, t) {
    this.props = props
    this.expressions = expressions || []
    this.composesCount = composesCount
    this.t = t
  }

  objKeyToAst(key): { computed: boolean, ast: any, composes: boolean } {
    const { t } = this
    const matches = this.getDynamicMatches(key)

    if (matches.length) {
      return {
        computed: true,
        composes: key === 'composes',
        ast: this.replacePlaceholdersWithExpressions(matches, key)
      }
    }

    return {
      computed: false,
      composes: key === 'composes',
      ast: t.stringLiteral(key === 'cssFloat' ? 'float' : key)
    }
  }

  objValueToAst(value) {
    const { composesCount, t } = this
    if (typeof value === 'string') {
      const matches = this.getDynamicMatches(value)
      if (matches.length) {
        return this.replacePlaceholdersWithExpressions(matches, value)
      }
      return t.stringLiteral(value)
    } else if (typeof value === 'number') {
      return t.numericLiteral(value)
    } else if (Array.isArray(value)) {
      // should never hit here

      if (value[0] && (value[0].key || value[0].value || value[0].spread)) {
        return this.toAST(value)
      }

      return t.arrayExpression(value.map(v => this.objValueToAst(v)))
    }

    return ASTObject.fromJS(value, composesCount, t).toAST()
  }

  getDynamicMatches(str) {
    const re = /xxx(\d+)xxx/gm
    let match
    const matches = []
    while ((match = re.exec(str)) !== null) {
      matches.push({
        value: match[0],
        p1: parseInt(match[1], 10),
        index: match.index
      })
    }

    return matches
  }

  replacePlaceholdersWithExpressions(matches: any[], str: string) {
    const { expressions, composesCount, t } = this

    const templateElements = []
    const templateExpressions = []
    let cursor = 0
    // not sure how to detect when to add 'px'
    let hasSingleInterpolation = false
    forEach(matches, ({ value, p1, index }, i) => {
      const preMatch = str.substring(cursor, index)
      cursor = cursor + preMatch.length + value.length
      if (preMatch) {
        templateElements.push(
          t.templateElement({ raw: preMatch, cooked: preMatch })
        )
      } else if (i === 0) {
        templateElements.push(t.templateElement({ raw: '', cooked: '' }))
      }
      if (value === str) {
        hasSingleInterpolation = true
      }

      templateExpressions.push(
        expressions.length
          ? expressions[p1 - composesCount]
          : t.identifier(`x${p1 - composesCount}`)
      )
      if (i === matches.length - 1) {
        templateElements.push(
          t.templateElement(
            {
              raw: str.substring(index + value.length),
              cooked: str.substring(index + value.length)
            },
            true
          )
        )
      }
    })
    if (hasSingleInterpolation) {
      return templateExpressions[0]
    }
    return t.templateLiteral(templateElements, templateExpressions)
  }

  toAST(props = this.props) {
    return this.t.objectExpression(
      props.map(prop => {
        if (this.t.isObjectProperty(prop)) {
          return prop
        }

        const { property, key, value, spread, shorthand } = prop

        if (spread || shorthand) {
          return property
        }

        const { computed, ast: keyAST } = this.objKeyToAst(key)
        const valueAST = this.objValueToAst(value)

        return this.t.objectProperty(keyAST, valueAST, computed)
      })
    )
  }

  toJS(props = this.props) {
    return props.reduce(
      (
        accum,
        { property, key, value, computed: isComputedProperty, spread }
      ) => {
        if (spread) {
          return accum
        }

        accum[key] = value
        return accum
      },
      {}
    )
  }

  static fromJS(jsObj, composesCount, t) {
    const props = []
    for (let key in jsObj) {
      if (jsObj.hasOwnProperty(key)) {
        let value
        if (Object.prototype.toString.call(jsObj[key]) === '[object Object]') {
          value = jsObj[key]
        } else {
          value = jsObj[key]
        }

        props.push({
          key: key,
          value: value,
          computed: false,
          spread: false,
          property: null
        })
      }
    }

    return new ASTObject(props, [], composesCount, t)
  }

  static fromAST(astObj, t, path) {
    function isLiteral(value) {
      return (
        t.isStringLiteral(value) ||
        t.isNumericLiteral(value) ||
        t.isBooleanLiteral(value)
      )
    }

    let expressions = []

    function replaceExpressionsWithPlaceholders(node) {
      if (t.isArrayExpression(node)) {
        return node.elements.map(replaceExpressionsWithPlaceholders)
      } else if (isLiteral(node)) {
        return node.value
      } else if (t.isTemplateLiteral(node)) {
        const strs = node.quasis.map(x => x.value.cooked)
        const exprs = node.expressions
        return reduce(
          strs,
          (arr, str, i) => {
            arr.push(str)
            if (i !== strs.length - 1) {
              expressions.push(exprs[i])
              arr.push(`xxx${expressions.length - 1}xxx`)
            }
            return arr
          },
          []
        )
          .join('')
          .trim()
      }

      expressions.push(node)
      return `xxx${expressions.length - 1}xxx`
    }

    function convertAstToObj(astObj) {
      const props = []

      forEach(astObj.properties, (property, i) => {
        let key
        if (t.isSpreadProperty(property)) {
          props.push({
            key: null,
            value: null,
            computed: false,
            shorthand: false,
            spread: true,
            property
          })
          return
        }

        if (property.computed) {
          key = replaceExpressionsWithPlaceholders(property.key)
        } else {
          key = t.isIdentifier(property.key)
            ? property.key.name
            : property.key.value
        }

        // nested objects
        if (t.isObjectExpression(property.value)) {
          props.push({
            key,
            value: convertAstToObj(property.value),
            computed: property.computed,
            spread: false,
            shorthand: false,
            property
          })
        } else {
          props.push({
            key,
            value: replaceExpressionsWithPlaceholders(property.value),
            computed: property.computed,
            spread: false,
            shorthand: false,
            property
          })
        }
      })
      return props
    }

    const objectProperties = convertAstToObj(prefixAst(astObj, t, path))
    return new ASTObject(
      objectProperties,
      expressions,
      0, // composesCount: we should support this,
      t
    )
  }
}
