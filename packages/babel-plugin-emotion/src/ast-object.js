export default class ASTObject {
  props: Array<any>
  expressions: Array<any>
  composesCount: number
  t: any

  constructor(src, expressions, t) {
    this.stringSrc = src
    this.expressions = expressions || []
    this.t = t
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
    const { expressions, t } = this
    if (expressions.length === 0) {
      return t.templateLiteral(
        [t.templateElement({ cooked: str, raw: str })],
        []
      )
    }
    const templateElements = []
    const templateExpressions = []
    let cursor = 0
    matches.forEach(({ value, p1, index }, i) => {
      const preMatch = str.substring(cursor, index)
      cursor = cursor + preMatch.length + value.length
      if (preMatch) {
        templateElements.push(
          t.templateElement({ raw: preMatch, cooked: preMatch })
        )
      } else if (i === 0) {
        templateElements.push(t.templateElement({ raw: '', cooked: '' }))
      }

      templateExpressions.push(expressions[p1])
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
    return t.templateLiteral(templateElements, templateExpressions)
  }
  toTemplateLiteral() {
    return this.replacePlaceholdersWithExpressions(
      this.getDynamicMatches(this.stringSrc),
      this.stringSrc
    )
  }
}
