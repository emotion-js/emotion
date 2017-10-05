import { hashString, Stylis, memoize, unitless } from 'emotion-utils'
import StyleSheet from './sheet'

export const sheet = new StyleSheet()
// 🚀
sheet.inject()
const stylisOptions = { keyframe: false }

if (process.env.NODE_ENV !== 'production') {
  stylisOptions.compress = false
}

let stylis = new Stylis(stylisOptions)

const externalStylisPlugins = []

const use = stylis.use

export const useStylisPlugin = plugin => {
  externalStylisPlugins.push(plugin)
  use(null)(externalStylisPlugins)(insertionPlugin)
}

export let registered = {}

export let inserted = {}

export function flush() {
  sheet.flush()
  inserted = {}
  registered = {}
  sheet.inject()
}

let currentSourceMap = ''
let queue = []
let orphans = {}

function insertNode(node) {
  console.log('node', node)
  if (node.children) {
    // console.log('children', node.children)
  }
  // sheet.insert(rule, currentSourceMap)
}

function Node(id, name, value, rule, parent, ruleText) {
  this.name = name
  this.value = value
  this.rule = rule
  this.parent = parent
  this.id = id
  this.ruleText = ruleText
  this.children = []
}

function insertionPlugin(
  context,
  content,
  selectors,
  parents,
  line,
  column,
  length,
  id
) {
  let index, name, value, node, type, deli, size
  let rule = selectors.join(',')
  let parent = parents.join(',')
  switch (context) {
    case -1: {
      queue = []
      break
    }

    case -2: {
      // console.log('queue', queue.reverse())
      queue.forEach((styleNode) => {
        console.log(styleNode.name)
        insertNode(styleNode)
        if (orphans[styleNode.name]) {
          orphans[styleNode.name].forEach((orphanNode) => {
            insertNode(orphanNode)
            if (orphans[orphanNode.name]) {
              orphans[orphanNode.name].forEach(insertNode)
            }
          })
        }
      })

      break
    }

    case 1:
      // content.charCodeAt(0) !== 64
      //   ? ((deli = ':'), (type = 'decl'))
      //   : ((deli = ' '), (rule = null), (type = '@at-rule'))
      // if (content.charCodeAt(0) === 64) {
      //   deli = ' '
      //   rule = null
      //   type = '@at-rule'
      //
      //   index = content.indexOf(deli)
      //   name = content.substring(0, index)
      //   value = content.substring(index + 1).trim()
      //   node = new Node(
      //     id,
      //     name,
      //     value,
      //     type,
      //     rule,
      //     parent,
      //     `${rule || ''}{${content}}`
      //   )
      //
      //   queue.push(node)
      // }

      break

    case 2: {
      // console.log('id', id)
      console.log('parent', parent)
      // console.log('selectors', selectors)
      // console.log('joined selectors', rule)
      // console.log('content', content)
      console.log(`${rule}{${content}}`)

      node = new Node(
        id,
        rule,
        selectors,
        'rule',
        parent,
        `${rule}{${content}}`
      )

      if (parent) {
        if (!orphans[parent]) {
          orphans[parent] = []
        }
        orphans[parent].push(node)
        console.log('orphans[parent]', orphans[parent])
      } else {
        queue.push(node)
      }

      // if (id === 0) {
      //   const out = `${rule}{${content}}`
      //   const joinedParents = parent.join(',')
      //   if (joinedParents === out || parent[0] === '') {
      //     queue.push(out)
      //   } else {
      //     queue.unshift(out)
      //   }
      // }
      break
    }
    // after an at rule block
    case 3: {
      node = new Node(
        id,
        rule,
        selectors,
        '@at-rule',
        parent,
        `${rule}{${content}}`
      )
      console.log('queue after at rule', queue)
      size = queue.length
      while (size--)
        if (queue[size].id === id) node.children.push(queue.splice(size, 1)[0])

      queue.push(node)
      break

      // let chars = selectors.join('')
      // const second = chars.charCodeAt(1)
      // let child = content
      // switch (second) {
      //   // s upports
      //   case 115:
      //   // d ocument
      //   // eslint-disable-next-line no-fallthrough
      //   case 100:
      //   // m edia
      //   // eslint-disable-next-line no-fallthrough
      //   case 109: {
      //     queue.push(chars + '{' + child + '}')
      //     break
      //   }
      //   // k eyframes
      //   case 107: {
      //     chars = chars.substring(1)
      //     child = chars + '{' + child + '}'
      //     queue.push('@-webkit-' + child)
      //     queue.push('@' + child)
      //     break
      //   }
      //   default: {
      //     queue.push(chars + child)
      //   }
      // }
    }
  }
}

stylis.use(insertionPlugin)

function flatten(inArr) {
  let arr = []
  inArr.forEach(val => {
    if (Array.isArray(val)) arr = arr.concat(flatten(val))
    else arr = arr.concat(val)
  })

  return arr
}

function handleInterpolation(
  interpolation: any,
  couldBeSelectorInterpolation: boolean
) {
  if (
    interpolation === undefined ||
    interpolation === null ||
    typeof interpolation === 'boolean'
  ) {
    return ''
  }

  if (typeof interpolation === 'function') {
    return handleInterpolation.call(
      this,
      this === undefined
        ? interpolation()
        : interpolation(this.mergedProps, this.context),
      couldBeSelectorInterpolation
    )
  }

  if (typeof interpolation === 'object') {
    return createStringFromObject.call(this, interpolation)
  }

  if (
    couldBeSelectorInterpolation === false &&
    registered[interpolation] !== undefined
  ) {
    return registered[interpolation]
  }
  return interpolation
}

const hyphenateRegex = /[A-Z]|^ms/g

const processStyleName = memoize(styleName =>
  styleName.replace(hyphenateRegex, '-$&').toLowerCase()
)

const processStyleValue = (key, value) => {
  if (value === undefined || value === null || typeof value === 'boolean')
    return ''

  if (unitless[key] !== 1 && !isNaN(value) && value !== 0) {
    return value + 'px'
  }
  return value
}

const objectToStringCache = new WeakMap()

function createStringFromObject(obj) {
  if (objectToStringCache.has(obj)) {
    return objectToStringCache.get(obj)
  }
  let string = ''

  if (Array.isArray(obj)) {
    flatten(obj).forEach(function(interpolation) {
      string += handleInterpolation.call(this, interpolation, false)
    }, this)
  } else {
    Object.keys(obj).forEach(function(key) {
      if (typeof obj[key] !== 'object') {
        if (registered[obj[key]] !== undefined) {
          string += `${key}{${registered[obj[key]]}}`
        } else {
          string += `${processStyleName(key)}:${processStyleValue(
            key,
            obj[key]
          )};`
        }
      } else {
        string += `${key}{${handleInterpolation.call(this, obj[key], false)}}`
      }
    }, this)
  }
  objectToStringCache.set(obj, string)

  return string
}

function isLastCharDot(string) {
  return string.charCodeAt(string.length - 1) === 46 // .
}

function createStyles(strings, ...interpolations) {
  let stringMode = true
  let styles = ''
  if (strings == null || strings.raw === undefined) {
    stringMode = false
    styles = handleInterpolation.call(this, strings, false)
  } else {
    styles = strings[0]
  }

  interpolations.forEach(function(interpolation, i) {
    styles += handleInterpolation.call(
      this,
      interpolation,
      isLastCharDot(styles)
    )
    if (stringMode === true && strings[i + 1] !== undefined) {
      styles += strings[i + 1]
    }
  }, this)

  return styles
}

if (process.env.NODE_ENV !== 'production') {
  const sourceMapRegEx = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\/\s+\/\*@\ssourceURL=\S+\s+\*\//
  const oldStylis = stylis
  stylis = (selector, styles) => {
    const result = sourceMapRegEx.exec(styles)
    currentSourceMap = result ? result[0] : ''
    oldStylis(selector, styles)
    currentSourceMap = ''
  }
}

export function css() {
  const styles = createStyles.apply(this, arguments)
  console.log(styles)
  const hash = hashString(styles)
  const cls = `css-${hash}`
  console.log(cls)
  if (registered[cls] === undefined) {
    registered[cls] = styles
  }
  if (inserted[hash] === undefined) {
    stylis(`.${cls}`, styles)
    inserted[hash] = true
  }
  return cls
}

export function injectGlobal(...args) {
  const styles = createStyles(...args)
  const hash = hashString(styles)
  if (inserted[hash] === undefined) {
    stylis('', styles)
    inserted[hash] = true
  }
}

export function keyframes(...args) {
  const styles = createStyles(...args)
  const hash = hashString(styles)
  const name = `animation-${hash}`
  if (inserted[hash] === undefined) {
    stylis('', `@keyframes ${name}{${styles}}`)
    inserted[hash] = true
  }
  return name
}

export function fontFace(...args) {
  const styles = createStyles(...args)
  const hash = hashString(styles)
  if (inserted[hash] === undefined) {
    stylis('', `@font-face{${styles}}`)
    inserted[hash] = true
  }
}

export function getRegisteredStyles(registeredStyles, classNames) {
  let rawClassName = ''

  classNames.split(' ').forEach(className => {
    if (registered[className] !== undefined) {
      registeredStyles.push(className)
    } else {
      rawClassName += `${className} `
    }
  })
  return rawClassName
}

export function merge(className, sourceMap) {
  const registeredStyles = []

  const rawClassName = getRegisteredStyles(registeredStyles, className)

  if (registeredStyles.length < 2) {
    return className
  }
  return rawClassName + css(registeredStyles, sourceMap)
}

export function hydrate(ids) {
  ids.forEach(id => {
    inserted[id] = true
  })
}
