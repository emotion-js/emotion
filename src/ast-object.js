import { forEach, reduce } from './utils'

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

  toAST () {
    const { obj, t } = this

    const props = []
    for (let key in obj) {
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
    return t.objectExpression(props)
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

  static fromAST (astObj, t) {
    function isLiteral (value) {
      return (
        t.isStringLiteral(value) ||
        t.isNumericLiteral(value) ||
        t.isBooleanLiteral(value)
      )
    }

    let obj = {}
    let expressions = []

    function replaceExpressionsWithPlaceholders (node) {
      if (t.isArrayExpression(node)) {
        return node.elements.map(replaceExpressionsWithPlaceholders)
      } else if (isLiteral(node)) {
        return node.value
      } else if (t.isTemplateLiteral(node)) {
        const strs = node.quasis.map(x => x.value.cooked)
        const exprs = node.expressions
        const value = reduce(
          strs,
          (arr, str, i) => {
            arr.push(str)
            if (i !== strs.length - 1) {
              expressions.push(exprs[i])
              arr.push(`xxx${expressions.length}xxx`)
            }
            return arr
          },
          []
        )
          .join('')
          .trim()
        return value
      }

      expressions.push(node)
      return `xxx${expressions.length}xxx`
    }

    function toObj (astObj) {
      astObj.properties.forEach(property => {
        // nested objects
        if (t.isObjectExpression(property.value)) {
          let key
          if (property.computed) {
            key = replaceExpressionsWithPlaceholders(property.key)
          } else {
            key = t.isStringLiteral(property.key)
              ? t.stringLiteral(property.key.value)
              : t.identifier(property.key.name)
          }

          obj[key] = toObj(property.value)
        } else {
          let key
          if (property.computed) {
            key = replaceExpressionsWithPlaceholders(property.key)
          } else {
            key = property.key.name
          }
          obj[key] = replaceExpressionsWithPlaceholders(property.value)
        }
      })

      return obj
    }

    return new ASTObject(
      toObj(astObj),
      expressions,
      0, // composesCount: we should support this,
      t
    )
  }
}
