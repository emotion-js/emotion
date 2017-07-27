import { find, merge } from 'lodash'
import { forEach, reduce } from './utils'

const SPREAD = Symbol('SPREAD')

export default class ASTObject {
  obj: { [string]: any }
  expressions: Array<any>
  composesCount: number
  t: any

  constructor (obj, expressions, composesCount, t) {
    this.obj = obj
    this.expressions = expressions
    this.composesCount = composesCount
    this.t = t
  }

  objKeyToAst (key): { computed: boolean, ast: any, composes: boolean } {
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
      ast: t.stringLiteral(key)
    }
  }

  objValueToAst (value) {
    const { expressions, composesCount, t } = this

    if (typeof value === 'string') {
      const matches = this.getDynamicMatches(value)
      if (matches.length) {
        return this.replacePlaceholdersWithExpressions(matches, value)
      }
      return t.stringLiteral(value)
    } else if (Array.isArray(value)) {
      // should never hit here
      return t.arrayExpression(value.map(v => this.objValueToAst(v)))
    }

    const obj = new this.constructor(value, expressions, composesCount, t)
    return obj.toAST()
  }

  getDynamicMatches (str) {
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

  replacePlaceholdersWithExpressions (matches: any[], str: string) {
    const { expressions, composesCount, t } = this

    const templateElements = []
    const templateExpressions = []
    let cursor = 0
    // not sure how to detect when to add 'px'
    // let hasSingleInterpolation = false
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
      // if (value === str) {
      // hasSingleInterpolation = true
      // }

      templateExpressions.push(
        expressions
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
    // if (hasSingleInterpolation) {
    //   return templateExpressions[0]
    // }
    return t.templateLiteral(templateElements, templateExpressions)
  }

  toAST () {
    const { obj, t } = this

    const props = []
    let counter = 0

    function findSpreadProp (i) {
      return find(obj[SPREAD], sp => sp.index === i)
    }

    if (Object.keys(obj).length === 0) {
      if (obj[SPREAD]) {
        props.push(...obj[SPREAD].map(sp => sp.property))
      }
    }

    for (let key in obj) {
      const spreadProp = findSpreadProp(counter)

      if (spreadProp) {
        props.push(spreadProp.property)
        ++counter;
      }

      const rawValue = obj[key]
      const { computed, composes, ast: keyAST } = this.objKeyToAst(key)

      let valueAST
      if (composes) {
        // valueAST = t.arrayExpression(expressions.slice(0, composesCount))
        continue
      } else {
        valueAST = this.objValueToAst(rawValue)
      }

      props.push(t.objectProperty(keyAST, valueAST, computed))
    }

    ++counter
    return t.objectExpression(props)
  }

  toObj () {
    return this.obj.reduce((accum, prop) => {
      if (!prop.spread) {
        accum[prop.key] = prop.value
      }
      return accum
    }, {})
  }

  merge (nextObj) {
    merge(
      this.obj,
      nextObj
    )
    return this
  }

  static fromAST (astObj, t) {
    function isLiteral (value) {
      return (
        t.isStringLiteral(value) ||
        t.isNumericLiteral(value) ||
        t.isBooleanLiteral(value)
      )
    }

    let expressions = []

    function replaceExpressionsWithPlaceholders (node) {
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

    function convertAstToObj (astObj) {
      let props = []

      forEach(astObj.properties, (property, i) => {
        let key
        if (t.isSpreadProperty(property)) {
          return props.push({
            key: null,
            value: null,
            computed: false,
            spread: true,
            property
          })
        } else if (property.computed) {
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
            property
          })
        } else {
          props.push({
            key,
            value: replaceExpressionsWithPlaceholders(property.value),
            computed: property.computed,
            spread: false,
            property
          })
        }
      })

      // Object.defineProperty(obj, SPREAD, {
      //   enumerable: true,
      //   get () {
      //     return spreadProperties
      //   }
      // })

      return props
    }

    const obj = convertAstToObj(astObj)
    return new ASTObject(
      obj,
      expressions,
      0, // composesCount: we should support this,
      t
    )
  }
}
