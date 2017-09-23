const interleave = (strings, interpolations) =>
  interpolations.reduce(
    (array, interp, i) => array.concat(interp, strings[i + 1]),
    [strings[0]]
  )

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
      node => node.value !== ''
    )
  }
  toExpressions() {
    return this.replacePlaceholdersWithExpressions(
      this.getDynamicMatches(this.stringSrc),
      this.stringSrc
    )
  }
}
