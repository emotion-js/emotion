/* eslint-disable */

var MS = '-ms-'
var MOZ = '-moz-'
var WEBKIT = '-webkit-'

var COMMENT = 'comm'
var RULESET = 'rule'
var DECLARATION = 'decl'

var PAGE = '@page'
var MEDIA = '@media'
var IMPORT = '@import'
var CHARSET = '@charset'
var VIEWPORT = '@viewport'
var SUPPORTS = '@supports'
var DOCUMENT = '@document'
var NAMESPACE = '@namespace'
var KEYFRAMES = '@keyframes'
var FONT_FACE = '@font-face'
var COUNTER_STYLE = '@counter-style'
var FONT_FEATURE_VALUES = '@font-feature-values'

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
 * @param {number} length
 * @return {number}
 */
function hash(value, length) {
  return (
    (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^
      charat(value, 2)) <<
      2) ^
    charat(value, 3)
  )
}

/**
 * @param {string} value
 * @return {string}
 */
function trim(value) {
  return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {boolean}
 */
function test(value, pattern) {
  return pattern.test(value)
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value
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
 * @param {string} value
 * @return {number}
 */
function indexof(value, search) {
  return value.indexOf(search)
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

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
function combine(array, callback) {
  return array.map(callback).join('')
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
 * @param {string} value
 * @param {object} root
 * @param {string} type
 */
function copy(value, root, type) {
  return node(value, root.root, type, root.props, root.children, 0)
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
 * @param {string} value
 * @return {string[]}
 */
function tokenize(value) {
  return dealloc(tokenizer(alloc(value)))
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
 * @param {string[]} children
 * @return {string[]}
 */
function tokenizer(children) {
  while (next())
    switch (token(character)) {
      case 0:
        append(identifier(position - 1), children)
        break
      case 2:
        append(delimit(character), children)
        break
      default:
        append(from(character), children)
    }

  return children
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
              rulesets
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

/**
 * @param {string} value
 * @param {number} length
 * @return {string}
 */
function prefix(value, length) {
  switch (hash(value, length)) {
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value
    // flex, flex-direction
    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value
    // order
    case 6165:
      return WEBKIT + value + MS + 'flex-' + value + value
    // align-items
    case 5187:
      return (
        WEBKIT +
        value +
        replace(
          value,
          /(\w+).+(:[^]+)/,
          WEBKIT + 'box-$1$2' + MS + 'flex-$1$2'
        ) +
        value
      )
    // align-self
    case 5443:
      return (
        WEBKIT +
        value +
        MS +
        'flex-item-' +
        replace(value, /flex-|-self/, '') +
        value
      )
    // align-content
    case 4675:
      return (
        WEBKIT +
        value +
        MS +
        'flex-line-pack' +
        replace(value, /align-content|flex-|-self/, '') +
        value
      )
    // flex-shrink
    case 5548:
      return WEBKIT + value + MS + replace(value, 'shrink', 'negative') + value
    // flex-basis
    case 5292:
      return (
        WEBKIT + value + MS + replace(value, 'basis', 'preferred-size') + value
      )
    // flex-grow
    case 6060:
      return (
        WEBKIT +
        'box-' +
        replace(value, '-grow', '') +
        WEBKIT +
        value +
        MS +
        replace(value, 'grow', 'positive') +
        value
      )
    // transition
    case 4554:
      return (
        WEBKIT +
        replace(value, /([^-])(transform)/g, '$1' + WEBKIT + '$2') +
        value
      )
    // cursor
    case 6187:
      return (
        replace(
          replace(
            replace(value, /(zoom-|grab)/, WEBKIT + '$1'),
            /(image-set)/,
            WEBKIT + '$1'
          ),
          value,
          ''
        ) + value
      )
    // background, background-image
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + '$1' + '$`$1')
    // justify-content
    case 4968:
      return (
        replace(
          replace(
            value,
            /(.+:)(flex-)?(.*)/,
            WEBKIT + 'box-pack:$3' + MS + 'flex-pack:$3'
          ),
          /s.+-b[^;]+/,
          'justify'
        ) +
        WEBKIT +
        value +
        value
      )
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + '$1$2') + value
    // (min|max)?(width|height|inline-size|block-size)
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      // stretch, max-content, min-content, fill-available
      if (strlen(value) - 1 - length > 6)
        switch (charat(value, length + 1)) {
          // (m)ax-content, (m)in-content
          case 109:
            return (
              replace(
                value,
                /(.+:)(.+)-([^]+)/,
                '$1' + WEBKIT + '$2-$3' + '$1' + MOZ + '$2-$3'
              ) + value
            )
          // (f)ill-available
          case 102:
            return (
              replace(
                value,
                /(.+:)(.+)-([^]+)/,
                '$1' + WEBKIT + '$2-$3' + '$1' + MOZ + '$3'
              ) + value
            )
          // (s)tretch
          case 115:
            return (
              prefix(replace(value, 'stretch', 'fill-available'), length) +
              value
            )
        }
      break
    // position: sticky
    case 4949:
      // (s)ticky?
      if (charat(value, length + 1) !== 115) break
    // display: (flex|inline-flex|inline-box)
    case 6444:
      switch (
        charat(value, strlen(value) - 3 - (~indexof(value, '!important') && 10))
      ) {
        // stic(k)y, inline-b(o)x
        case 107:
        case 111:
          return replace(value, value, WEBKIT + value) + value
        // (inline-)?fl(e)x
        case 101:
          return (
            replace(
              value,
              /(.+:)([^;!]+)(;|!.+)?/,
              '$1' +
                WEBKIT +
                (charat(value, 14) === 45 ? 'inline-' : '') +
                'box$3' +
                '$1' +
                WEBKIT +
                '$2$3' +
                '$1' +
                MS +
                '$2box$3'
            ) + value
          )
      }
      break
    // writing-mode
    case 5936:
      switch (charat(value, length + 11)) {
        // vertical-l(r)
        case 114:
          return (
            WEBKIT +
            value +
            MS +
            replace(value, /[svh]\w+-[tblr]{2}/, 'tb') +
            value
          )
        // vertical-r(l)
        case 108:
          return (
            WEBKIT +
            value +
            MS +
            replace(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') +
            value
          )
        // horizontal(-)tb
        case 45:
          return (
            WEBKIT +
            value +
            MS +
            replace(value, /[svh]\w+-[tblr]{2}/, 'lr') +
            value
          )
      }

      return WEBKIT + value + MS + value + value
  }

  return value
}

/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function serialize(children, callback) {
  var output = ''
  var length = sizeof(children)

  for (var i = 0; i < length; i++)
    output += callback(children[i], i, children, callback) || ''

  return output
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function stringify(element, index, children, callback) {
  switch (element.type) {
    case IMPORT:
    case DECLARATION:
      return (element.return = element.return || element.value)
    case COMMENT:
      return ''
    case RULESET:
      element.value = element.props.join(',')
  }

  return strlen((children = serialize(element.children, callback)))
    ? (element.return = element.value + '{' + children + '}')
    : ''
}

/**
 * @param {function[]} collection
 * @return {function}
 */
function middleware(collection) {
  var length = sizeof(collection)

  return function(element, index, children, callback) {
    var output = ''

    for (var i = 0; i < length; i++)
      output += collection[i](element, index, children, callback) || ''

    return output
  }
}

/**
 * @param {function} callback
 * @return {function}
 */
function rulesheet(callback) {
  return function(element) {
    if (!element.root) if ((element = element.return)) callback(element)
  }
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 */
function prefixer(element, index, children, callback) {
  switch (element.type) {
    case DECLARATION:
      element.return = prefix(element.value, element.length)
      break
    case KEYFRAMES:
      return serialize(
        [copy(replace(element.value, '@', '@' + WEBKIT), element, '')],
        callback
      )
    case RULESET:
      if (element.length)
        return combine(element.props, function(value) {
          switch (match(value, /(::place.+|:read-.+)/)) {
            // :read-(only|write)
            case ':read-only':
            case ':read-write':
              return serialize(
                [copy(replace(value, /(read.+)/, MOZ + '$1'), element, '')],
                callback
              )
            // :placeholder
            case '::placeholder':
              return serialize(
                [
                  copy(
                    replace(value, /(plac.+)/, WEBKIT + 'input-$1'),
                    element,
                    ''
                  ),
                  copy(replace(value, /(plac.+)/, MOZ + '$1'), element, ''),
                  copy(
                    replace(value, /:(plac.+)/, MS + 'input-$1'),
                    element,
                    ''
                  )
                ],
                callback
              )
          }

          return ''
        })
  }
}

/**
 * @param {object} element
 */
function namespace(element) {
  switch (element.type) {
    case RULESET:
      element.props = element.props.map(function(value) {
        return combine(tokenize(value), function(value, index, children) {
          switch (charat(value, 0)) {
            // \f
            case 12:
              return substr(value, 1, strlen(value))
            // \0 ( + > ~
            case 0:
            case 40:
            case 43:
            case 62:
            case 126:
              return value
            // :
            case 58:
              if (children[index + 1] === 'global')
                (children[index + 1] = ''),
                  (children[index + 2] =
                    '\f' + substr(children[index + 2], (index = 1), -1))
            // \s
            case 32:
              return index === 1 ? '' : value
            default:
              switch (index) {
                case 0:
                  element = value
                  return sizeof(children) > 1 ? '' : value
                case (index = sizeof(children) - 1):
                case 2:
                  return index === 2
                    ? value + element + element
                    : value + element
                default:
                  return value
              }
          }
        })
      })
  }
}

/**
 * @param {string[]} tokens
 * @param {number} current
 */
function move(tokens, current) {
  while (++current < tokens.length) {
    if (charat(tokens[current], 0) === 44) break
  }
  return ++current
}

/**
 * @param {object} element
 */
function compat(element) {
  switch (element.type) {
    case RULESET:
      var current = 0
      var next = 0
      var props = element.props
      var value = element.value
      var length = props.length
      var prop

      if (length === 1 && charat(value, 0) !== 58) {
        return
      }

      var tokens = tokenize(value)

      for (var i = 0; i < length; i++) {
        ;(prop = props[i]), (next = move(tokens, (current = next)))

        if (charat(tokens[current], 0) !== 58) {
          continue
        }

        var pattern = ''
        while (current < next - 1) {
          pattern += tokens[current++]
        }
        props[i] = replace(prop, ' ' + pattern, pattern)
      }
  }
}

export {
  CHARSET,
  COMMENT,
  COUNTER_STYLE,
  DECLARATION,
  DOCUMENT,
  FONT_FACE,
  FONT_FEATURE_VALUES,
  IMPORT,
  KEYFRAMES,
  MEDIA,
  MOZ,
  MS,
  NAMESPACE,
  PAGE,
  RULESET,
  SUPPORTS,
  VIEWPORT,
  WEBKIT,
  abs,
  alloc,
  append,
  caret,
  char,
  character,
  characters,
  charat,
  column,
  combine,
  comment,
  commenter,
  compat,
  compile,
  copy,
  dealloc,
  declaration,
  delimit,
  delimiter,
  from,
  hash,
  identifier,
  indexof,
  length,
  line,
  match,
  middleware,
  namespace,
  next,
  node,
  parse,
  peek,
  position,
  prefix,
  prefixer,
  replace,
  ruleset,
  rulesheet,
  serialize,
  sizeof,
  slice,
  stringify,
  strlen,
  substr,
  test,
  token,
  tokenize,
  tokenizer,
  trim,
  whitespace
}
