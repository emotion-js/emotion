// @flow
import type { Types, Expression, StringLiteral } from 'babel-flow-types'
const interleave = (
  strings: Array<StringLiteral>,
  interpolations: Array<Expression>
) =>
  interpolations.reduce(
    (array, interp, i) => array.concat([interp], strings[i + 1]),
    [strings[0]]
  )

export default class ASTObject {
  expressions: Array<Expression>
  t: any
  src: string

  constructor(src: string, expressions: Array<Expression>, t: Types) {
    this.src = src
    this.expressions = expressions || []
    this.t = t
  }
  getDynamicMatches(str: string) {
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
      if (str === '') {
        return []
      }
      return [t.stringLiteral(str)]
    }
    const strings = []
    const finalExpressions = []
    let cursor = 0

    matches.forEach(({ value, p1, index }, i) => {
      const preMatch = str.substring(cursor, index)
      cursor = cursor + preMatch.length + value.length
      if (preMatch) {
        strings.push(t.stringLiteral(preMatch))
      } else if (i === 0) {
        strings.push(t.stringLiteral(''))
      }

      finalExpressions.push(expressions[p1])
      if (i === matches.length - 1) {
        strings.push(t.stringLiteral(str.substring(index + value.length)))
      }
    })

    return interleave(strings, finalExpressions).filter(
      // $FlowFixMe
      (node: StringLiteral) => {
        return node.value !== ''
      }
    )
  }
  toExpressions() {
    return this.replacePlaceholdersWithExpressions(
      this.getDynamicMatches(this.src),
      this.src
    )
  }
}
