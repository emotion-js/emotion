/* eslint-disable */

var COMMENT = 'comm'
var RULESET = 'rule'
var DECLARATION = 'decl'

/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs

/**
 * @param {number}
 * @return {string}
 */
var from = String.fromCharCode

/**
 * @param {string} value
 * @return {string}
 */
function trim(value) {
  return value.trim()
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
function charat(value, index) {
  return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function substr(value, begin, end) {
  return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
function strlen(value) {
  return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
function sizeof(value) {
  return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
function append(value, array) {
  return array.push(value), value
}

var line = 1
var column = 1
var length = 0
var position = 0
var character = 0
var characters = ''

/**
 * @param {string} value
 * @param {object} root
 * @param {string} type
 * @param {string[]} props
 * @param {object[]} children
 * @param {number} length
 */
function node(value, root, type, props, children, length) {
  return {
    value: value,
    root: root,
    type: type,
    props: props,
    children: children,
    line: line,
    column: column,
    length: length,
    return: ''
  }
}

/**
 * @return {number}
 */
function char() {
  return character
}

/**
 * @return {number}
 */
function next() {
  character = position < length ? charat(characters, position++) : 0

  if ((column++, character === 10)) (column = 1), line++

  return character
}

/**
 * @return {number}
 */
function peek() {
  return charat(characters, position)
}

/**
 * @return {number}
 */
function caret() {
  return position
}

/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function slice(begin, end) {
  return substr(characters, begin, end)
}

/**
 * @param {number} type
 * @return {number}
 */
function token(type) {
  switch (type) {
    // \0 \t \n \s whitespace token
    case 0:
    case 9:
    case 10:
    case 32:
      return 5
    // ! + , / > @ ~ isolate token
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    // ; { } / breakpoint token
    case 59:
    case 123:
    case 125:
      return 4
    // : accompanied token
    case 58:
      return 3
    // " ' ( [ opening delimit token
    case 34:
    case 39:
    case 40:
    case 91:
      return 2
    // ) ] closing delimit token
    case 41:
    case 93:
      return 1
  }

  return 0
}

/**
 * @param {string} value
 * @return {any[]}
 */
function alloc(value) {
  return (
    (line = column = 1),
    (length = strlen((characters = value))),
    (position = 0),
    []
  )
}

/**
 * @param {any} value
 * @return {any}
 */
function dealloc(value) {
  return (characters = ''), value
}

/**
 * @param {number} type
 * @return {string}
 */
function delimit(type) {
  return trim(
    slice(
      position - 1,
      delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)
    )
  )
}

/**
 * @param {number} type
 * @return {string}
 */
function whitespace(type) {
  while ((character = peek()))
    if (character < 33) next()
    else break

  return token(type) > 2 || token(character) > 3 ? '' : ' '
}

/**
 * @param {number} type
 * @return {number}
 */
function delimiter(type) {
  while (next())
    switch (character) {
      // ] ) " '
      case type:
        return position
      // " '
      case 34:
      case 39:
        return delimiter(type === 34 || type === 39 ? type : character)
      // (
      case 40:
        if (type === 41) delimiter(type)
        break
      // \
      case 92:
        next()
        break
    }

  return position
}

/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */
function commenter(type, index) {
  while (next())
    // //
    if (type + character === 47 + 10) break
    // /*
    else if (type + character === 42 + 42 && peek() === 47) break

  return (
    '/*' + slice(index, position - 1) + '*' + from(type === 47 ? type : next())
  )
}

/**
 * @param {number} index
 * @return {string}
 */
function identifier(index) {
  while (!token(peek())) next()

  return slice(index, position)
}

/**
 * @param {string} value
 * @return {object[]}
 */
function compile(value) {
  return dealloc(
    parse('', null, null, [''], (value = alloc(value)), [0], value)
  )
}

/**
 * @param {string} value
 * @param {object} root
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */
function parse(value, root, rule, rules, rulesets, points, declarations) {
  var index = 0
  var offset = 0
  var length = 0
  var atrule = 0
  var property = 0
  var previous = 0
  var variable = 1
  var scanning = 1
  var ampersand = 1
  var character = 0
  var type = ''
  var props = rules
  var children = rulesets
  var reference = rule
  var characters = type

  while (scanning)
    switch (((previous = character), (character = next()))) {
      // " ' [ (
      case 34:
      case 39:
      case 91:
      case 40:
        characters += delimit(character)
        break
      // \t \n \s
      case 9:
      case 10:
      case 32:
        characters += whitespace(previous)
        break
      // /
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root), declarations)
            break
          default:
            characters += '/'
        }
        break
      // {
      case 123 * variable:
        points[index++] = strlen(characters) * ampersand
      // } ; \0
      case 125 * variable:
      case 59:
      case 0:
        switch (character) {
          // \0 }
          case 0:
          case 125:
            scanning = 0
          // ;
          case 59 + offset:
            if (length > 0)
              append(
                property > 32
                  ? declaration(characters + ';', rule, length)
                  : declaration(
                      replace(characters, ' ', '') + ';',
                      rule,
                      length - 1
                    ),
                declarations
              )
            break
          // @ ;
          case 59:
            characters += ';'
          // { rule/at-rule
          default:
            append(
              (reference = ruleset(
                characters,
                root,
                index,
                offset,
                rules,
                points,
                type,
                (props = []),
                (children = []),
                length
              )),
              declarations
            )

            if (character === 123)
              if (offset === 0)
                parse(
                  characters,
                  root,
                  reference,
                  props,
                  rulesets,
                  points,
                  children
                )
              else
                switch (atrule) {
                  // d m s
                  case 100:
                  case 109:
                  case 115:
                    parse(
                      value,
                      reference,
                      rule &&
                        append(
                          ruleset(
                            value,
                            reference,
                            0,
                            0,
                            rules,
                            points,
                            type,
                            rules,
                            (props = [])
                          ),
                          children
                        ),
                      rules,
                      children,
                      points,
                      rule ? props : children
                    )
                    break
                  default:
                    parse(
                      characters,
                      reference,
                      reference,
                      [''],
                      children,
                      points,
                      children
                    )
                }
        }
        ;(index = length = offset = 0),
          (variable = ampersand = 1),
          (type = characters = '')
        break
      // :
      case 58:
        ;(length = strlen(characters)), (property = previous)
      default:
        switch (((characters += from(character)), character * variable)) {
          // &
          case 38:
            ampersand = offset > 0 ? 1 : ((characters += '\f'), -1)
            break
          // ,
          case 44:
            ;(points[index++] = (strlen(characters) - 1) * ampersand),
              (ampersand = 1)
            break
          // @
          case 64:
            // -
            if (peek() === 45) characters += delimit(next())
            ;(atrule = peek()),
              (offset = strlen((type = characters += identifier(caret())))),
              character++
            break
          // -
          case 45:
            if (previous === 45) variable = 0
        }
    }

  return rulesets
}

/**
 * @param {string} value
 * @param {object} root
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @return {object}
 */
function ruleset(
  value,
  root,
  index,
  offset,
  rules,
  points,
  type,
  props,
  children,
  length
) {
  var post = offset - 1
  var rule = offset === 0 ? rules : ['']
  var size = sizeof(rule)

  for (var i = 0, j = 0, k = 0; i < index; ++i)
    for (
      var x = 0,
        y = substr(value, post + 1, (post = abs((j = points[i])))),
        z = value;
      x < size;
      ++x
    )
      if ((z = trim(j > 0 ? rule[x] + ' ' + y : replace(y, /&\f/g, rule[x]))))
        props[k++] = z

  return node(
    value,
    root,
    offset === 0 ? RULESET : type,
    props,
    children,
    length
  )
}

/**
 * @param {number} value
 * @param {string[]} root
 * @param {number} type
 * @return {object}
 */
function comment(value, root) {
  return node(value, root, COMMENT, from(char()), substr(value, 2, -2), 0)
}

/**
 * @param {string} value
 * @param {string[]} root
 * @param {number} length
 * @return {object}
 */
function declaration(value, root, length) {
  return node(
    value,
    root,
    DECLARATION,
    substr(value, 0, length),
    substr(value, length + 1, -1),
    length
  )
}

export default compile
