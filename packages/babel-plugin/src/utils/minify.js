// @flow
import { compile } from 'stylis'

const isAutoInsertedRule = element => {
  if (element.type !== 'rule' || !element.parent) {
    return false
  }

  let parent = element
  do {
    parent = parent.parent
  } while (parent && parent.type !== 'rule')

  return !!parent && element.value === parent.value
}

const toInputTree = (elements, tree) => {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]
    const { parent, children } = element

    if (!parent) {
      tree.push(element)
    } else if (!isAutoInsertedRule(element)) {
      parent.children.push(element)
    }

    if (Array.isArray(children)) {
      element.children = []
      toInputTree(children, tree)
    }
  }

  return tree
}

var stringifyTree = elements => {
  return elements
    .map(element => {
      switch (element.type) {
        case 'import':
        case 'decl':
          return element.value
        case 'comm':
          // When we encounter a standard multi-line CSS comment and it contains a '@'
          // character, we keep the comment. Some Stylis plugins, such as
          // the stylis-rtl via the cssjanus plugin, use this special comment syntax
          // to control behavior (such as: /* @noflip */). We can do this
          // with standard CSS comments because they will work with compression,
          // as opposed to non-standard single-line comments that will break compressed CSS.
          return element.props === '/' && element.value.includes('@')
            ? element.value
            : ''
        case 'rule':
          return `${element.value.replace(/&\f/g, '&')}{${stringifyTree(
            element.children
          )}}`
        default: {
          return `${element.value}{${stringifyTree(element.children)}}`
        }
      }
    })
    .join('')
}

const interleave = (strings: Array<*>, interpolations: Array<*>) =>
  interpolations.reduce(
    (array, interp, i) => array.concat([interp], strings[i + 1]),
    [strings[0]]
  )

function getDynamicMatches(str: string) {
  const re = /xxx(\d+):xxx/gm
  let match
  const matches = []
  while ((match = re.exec(str)) !== null) {
    // so that flow doesn't complain
    if (match !== null) {
      matches.push({
        value: match[0],
        p1: parseInt(match[1], 10),
        index: match.index
      })
    }
  }

  return matches
}

function replacePlaceholdersWithExpressions(
  str: string,
  expressions: Array<*>,
  t: *
) {
  const matches = getDynamicMatches(str)
  if (matches.length === 0) {
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
    (node: { value: string }) => {
      return node.value !== ''
    }
  )
}

function createRawStringFromTemplateLiteral(quasi: {
  quasis: Array<{ value: { cooked: string } }>
}) {
  let strs = quasi.quasis.map(x => x.value.cooked)

  const src = strs
    .reduce((arr, str, i) => {
      arr.push(str)
      if (i !== strs.length - 1) {
        arr.push(`xxx${i}:xxx`)
      }
      return arr
    }, [])
    .join('')
    .trim()
  return src
}

export default function minify(path: *, t: *): void {
  const quasi = path.node.quasi
  const raw = createRawStringFromTemplateLiteral(quasi)
  const minified = stringifyTree(toInputTree(compile(raw), []))
  const expressions = replacePlaceholdersWithExpressions(
    minified,
    quasi.expressions || [],
    t
  )
  path.replaceWith(t.callExpression(path.node.tag, expressions))
}
