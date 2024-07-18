const insertedRules = new WeakMap()

if (typeof CSSStyleSheet !== 'undefined') {
  const insertRule = CSSStyleSheet.prototype.insertRule
  CSSStyleSheet.prototype.insertRule = function (...args) {
    let sheetRules = insertedRules.get(this)

    if (!sheetRules) {
      sheetRules = []
      insertedRules.set(this, sheetRules)
    }

    const rule = args[0]
    sheetRules.push(rule)

    return insertRule.apply(this, args)
  }
}

const isBrowser = typeof document !== 'undefined'

function last(arr) {
  return arr.length > 0 ? arr[arr.length - 1] : undefined
}

export function flatMap /* <T, S> */(
  arr /*: T[] */,
  iteratee /*: (arg: T) => S[] | S */
) /*: S[] */ {
  return [].concat(...arr.map(iteratee))
}

export function findLast /* <T> */(
  arr /*: T[] */,
  predicate /*: T => boolean */
) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i])) {
      return arr[i]
    }
  }
}

export function findIndexFrom /* <T> */(
  arr /*: T[] */,
  fromIndex /*: number */,
  predicate /*: T => boolean */
) {
  for (let i = fromIndex; i < arr.length; i++) {
    if (predicate(arr[i])) {
      return i
    }
  }

  return -1
}

function getClassNames(selectors, classes /* ?: string */) {
  return classes ? selectors.concat(classes.split(' ')) : selectors
}

function getClassNamesFromTestRenderer(selectors, { props = {} }) {
  return getClassNames(selectors, props.className || props.class)
}

function shouldDive(node) {
  return typeof node.dive === 'function' && typeof node.type() !== 'string'
}

function isTagWithClassName(node) {
  return node.prop('className') && typeof node.type() === 'string'
}

function findNodeWithClassName(node) {
  // Find the first node with a className prop
  const found = node.findWhere(isTagWithClassName)
  return found.length ? found.first() : null
}

function getClassNameProp(node) {
  return (node && node.prop('className')) || ''
}

export function unwrapFromPotentialFragment(node) {
  if (node.type() === Symbol.for('react.fragment')) {
    const isShallow = !!node.dive
    if (isShallow) {
      // render the `<Insertion/>` so it has a chance to insert rules in the JSDOM
      node.children().first().dive()
    }

    return node.children().last()
  }
  return node
}

function getClassNamesFromEnzyme(selectors, nodeWithPotentialFragment) {
  const node = unwrapFromPotentialFragment(nodeWithPotentialFragment)
  // We need to dive in to get the className if we have a styled element from a shallow render
  const isShallow = shouldDive(node)
  const nodeWithClassName = findNodeWithClassName(
    isShallow ? node.dive() : node
  )
  return getClassNames(selectors, getClassNameProp(nodeWithClassName))
}

function getClassNamesFromCheerio(selectors, node) {
  const classes = node.attr('class')
  return getClassNames(selectors, classes)
}

function getClassNamesFromDOMElement(selectors, node) {
  return getClassNames(selectors, node.getAttribute('class'))
}

export function isReactElement(val) /*: boolean */ {
  return (
    val.$$typeof === Symbol.for('react.test.json') ||
    val.$$typeof === Symbol.for('react.element')
  )
}

export function isEmotionCssPropElementType(val) /*: boolean */ {
  return (
    val.$$typeof === Symbol.for('react.element') &&
    val.type.displayName === 'EmotionCssPropInternal'
  )
}

export function isStyledElementType(val /* : any */) /* : boolean */ {
  if (val.$$typeof !== Symbol.for('react.element')) {
    return false
  }
  const { type } = val
  return type.__emotion_real === type
}

export function isEmotionCssPropEnzymeElement(val /* : any */) /*: boolean */ {
  return (
    val.$$typeof === Symbol.for('react.test.json') &&
    val.type === 'EmotionCssPropInternal'
  )
}
const domElementPattern = /^((HTML|SVG)\w*)?Element$/

export function isDOMElement(val) /*: boolean */ {
  return (
    val.nodeType === 1 &&
    val.constructor &&
    val.constructor.name &&
    domElementPattern.test(val.constructor.name)
  )
}

function isEnzymeElement(val) /*: boolean */ {
  return typeof val.findWhere === 'function'
}

function isCheerioElement(val) /*: boolean */ {
  return val.cheerio === '[cheerio object]'
}

export function getClassNamesFromNodes(nodes /*: Array<any> */) {
  return nodes.reduce((selectors, node) => {
    if (isEnzymeElement(node)) {
      return getClassNamesFromEnzyme(selectors, node)
    } else if (isCheerioElement(node)) {
      return getClassNamesFromCheerio(selectors, node)
    } else if (isReactElement(node)) {
      return getClassNamesFromTestRenderer(selectors, node)
    }
    return getClassNamesFromDOMElement(selectors, node)
  }, [])
}

const keyframesPattern = /^@keyframes\s+(animation-[^{\s]+)+/

const removeCommentPattern = /\/\*[\s\S]*?\*\//g

const getElementRules = (element /*: HTMLStyleElement */) /*: string[] */ => {
  const nonSpeedyRule = element.textContent
  if (nonSpeedyRule) {
    return [nonSpeedyRule]
  }
  if (!element.sheet) {
    return []
  }
  const rules = insertedRules.get(element.sheet)
  if (rules) {
    return rules
  }
  return [].slice.call(element.sheet.cssRules).map(cssRule => cssRule.cssText)
}

const getKeyframesMap = rules =>
  rules.reduce((keyframes, rule) => {
    const match = rule.match(keyframesPattern)
    if (match !== null) {
      const name = match[1]
      if (keyframes[name] === undefined) {
        keyframes[name] = ''
      }
      keyframes[name] += rule
    }
    return keyframes
  }, {})

export function getStylesFromClassNames(
  classNames /*: Array<string> */,
  elements /*: Array<HTMLStyleElement> */
) /*: string */ {
  if (!classNames.length) {
    return ''
  }
  const keys = getKeys(elements)
  if (!keys.length) {
    return ''
  }

  const targetClassName = classNames.find(className =>
    /^e[a-z0-9]+$/.test(className)
  )
  const keyPattern = `(${keys.join('|')})-`
  const classNamesRegExp = new RegExp(
    targetClassName ? `^(${keyPattern}|${targetClassName})` : `^${keyPattern}`
  )
  const filteredClassNames = classNames.filter(className =>
    classNamesRegExp.test(className)
  )

  if (!filteredClassNames.length) {
    return ''
  }
  const selectorPattern = new RegExp(
    '\\.(?:' + filteredClassNames.map(cls => `(${cls})`).join('|') + ')'
  )

  const rules = flatMap(elements, getElementRules)

  let styles = rules
    .map((rule /*: string */) => {
      const match = rule.match(selectorPattern)
      if (!match) {
        return null
      }
      // `selectorPattern` represents all emotion-generated class names
      // each possible class name is wrapped in a capturing group
      // and those groups appear in the same order as they appear in the DOM within class attributes
      // because we've gathered them from the DOM in such order
      // given that information we can sort matched rules based on the capturing group that has been matched
      // to end up with styles in a stable order
      const matchedCapturingGroupIndex = findIndexFrom(match, 1, Boolean)
      return [rule, matchedCapturingGroupIndex]
    })
    .filter(Boolean)
    .sort(
      ([ruleA, classNameIndexA], [ruleB, classNameIndexB]) =>
        classNameIndexA - classNameIndexB
    )
    .map(([rule]) => rule)
    .join('')

  const keyframesMap = getKeyframesMap(rules)
  const keyframeNameKeys = Object.keys(keyframesMap)
  let keyframesStyles = ''

  if (keyframeNameKeys.length) {
    const keyframesNamePattern = new RegExp(keyframeNameKeys.join('|'), 'g')
    const keyframesNameCache = {}
    let index = 0

    styles = styles.replace(keyframesNamePattern, name => {
      if (keyframesNameCache[name] === undefined) {
        keyframesNameCache[name] = `animation-${index++}`
        keyframesStyles += keyframesMap[name]
      }
      return keyframesNameCache[name]
    })

    keyframesStyles = keyframesStyles.replace(keyframesNamePattern, value => {
      return keyframesNameCache[value]
    })
  }

  return (keyframesStyles + styles).replace(removeCommentPattern, '')
}

export function getStyleElements() /*: Array<HTMLStyleElement> */ {
  if (!isBrowser) {
    throw new Error(
      'jest-emotion requires jsdom. See https://jestjs.io/docs/en/configuration#testenvironment-string for more information.'
    )
  }
  const elements = Array.from(document.querySelectorAll('style[data-emotion]'))
  return elements
}

const unique = arr => Array.from(new Set(arr))

export function getKeys(elements /*: Array<HTMLStyleElement> */) {
  const keys = unique(
    elements.map(element => element.getAttribute('data-emotion'))
  ).filter(Boolean)
  return keys
}

export function hasClassNames(
  classNames /*: Array<string> */,
  selectors /*: Array<string> */,
  target /* ?: string | RegExp */
) /*: boolean */ {
  // selectors is the classNames of specific css rule
  return selectors.some(selector => {
    // if no target, use className of the specific css rule and try to find it
    // in the list of received node classNames to make sure this css rule
    // applied for root element
    if (!target) {
      const lastCls = last(selector.split(' '))
      if (!lastCls) {
        return false
      }
      return classNames.includes(lastCls.slice(1))
    }
    // check if selector (className) of specific css rule match target
    return target instanceof RegExp
      ? target.test(selector)
      : selector.includes(target)
  })
}

export function getMediaRules(
  rules /*: Array<Object> */,
  media /*: string */
) /*: Array<any> */ {
  return flatMap(
    rules.filter(rule => {
      if (rule.type !== '@media') {
        return false
      }
      return rule.value.replace(/\s/g, '').includes(media.replace(/\s/g, ''))
    }),
    media => media.children
  )
}

export function isPrimitive(test) {
  return test !== Object(test)
}

export function hasIntersection(left /* any[] */, right /* any[] */) {
  return left.some(value => right.includes(value))
}
