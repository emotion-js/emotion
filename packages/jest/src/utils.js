// @flow

const isBrowser = typeof document !== 'undefined'

function last(arr) {
  return arr.length > 0 ? arr[arr.length - 1] : undefined
}

export function flatMap<T, S>(arr: T[], iteratee: (arg: T) => S[] | S): S[] {
  return [].concat(...arr.map(iteratee))
}

export function findLast<T>(arr: T[], predicate: T => boolean) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i])) {
      return arr[i]
    }
  }
}

function getClassNames(selectors: any, classes?: string) {
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

function getClassNamesFromEnzyme(selectors, node) {
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

function getClassNamesFromDOMElement(selectors, node: any) {
  return getClassNames(selectors, node.getAttribute('class'))
}

export function isReactElement(val: any): boolean {
  return val.$$typeof === Symbol.for('react.test.json')
}

export function isEmotionCssPropElementType(val: any): boolean {
  return (
    val.$$typeof === Symbol.for('react.element') &&
    val.type.$$typeof === Symbol.for('react.forward_ref') &&
    val.type.displayName === 'EmotionCssPropInternal'
  )
}

export function isEmotionCssPropEnzymeElement(val: any): boolean {
  return (
    val.$$typeof === Symbol.for('react.test.json') &&
    val.type === 'EmotionCssPropInternal'
  )
}
const domElementPattern = /^((HTML|SVG)\w*)?Element$/

export function isDOMElement(val: any): boolean {
  return (
    val.nodeType === 1 &&
    val.constructor &&
    val.constructor.name &&
    domElementPattern.test(val.constructor.name)
  )
}

function isEnzymeElement(val: any): boolean {
  return typeof val.findWhere === 'function'
}

function isCheerioElement(val: any): boolean {
  return val.cheerio === '[cheerio object]'
}

export function getClassNamesFromNodes(nodes: Array<any>) {
  return nodes.reduce((selectors, node) => {
    if (isReactElement(node)) {
      return getClassNamesFromTestRenderer(selectors, node)
    } else if (isEnzymeElement(node)) {
      return getClassNamesFromEnzyme(selectors, node)
    } else if (isCheerioElement(node)) {
      return getClassNamesFromCheerio(selectors, node)
    }
    return getClassNamesFromDOMElement(selectors, node)
  }, [])
}

const keyframesPattern = /^@keyframes\s+(animation-[^{\s]+)+/

const removeCommentPattern = /\/\*[\s\S]*?\*\//g

const getElementRules = (element: HTMLStyleElement): string[] => {
  const nonSpeedyRule = element.textContent
  if (nonSpeedyRule) {
    return [nonSpeedyRule]
  }
  if (!element.sheet) {
    return []
  }
  // $FlowFixMe - flow doesn't know about `cssRules` property
  return [].slice.call(element.sheet.cssRules).map(cssRule => cssRule.cssText)
}

export function getStylesFromClassNames(
  classNames: Array<string>,
  elements: Array<HTMLStyleElement>
): string {
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
    '\\.(' + filteredClassNames.join('|') + ')'
  )
  const keyframes = {}
  let styles = ''

  flatMap(elements, getElementRules).forEach((rule: string) => {
    if (selectorPattern.test(rule)) {
      styles += rule
    }
    const match = rule.match(keyframesPattern)
    if (match !== null) {
      const name = match[1]
      if (keyframes[name] === undefined) {
        keyframes[name] = ''
      }
      keyframes[name] += rule
    }
  })
  const keyframeNameKeys = Object.keys(keyframes)
  let keyframesStyles = ''

  if (keyframeNameKeys.length) {
    const keyframesNamePattern = new RegExp(keyframeNameKeys.join('|'), 'g')
    const keyframesNameCache = {}
    let index = 0

    styles = styles.replace(keyframesNamePattern, name => {
      if (keyframesNameCache[name] === undefined) {
        keyframesNameCache[name] = `animation-${index++}`
        keyframesStyles += keyframes[name]
      }
      return keyframesNameCache[name]
    })

    keyframesStyles = keyframesStyles.replace(keyframesNamePattern, value => {
      return keyframesNameCache[value]
    })
  }

  return (keyframesStyles + styles).replace(removeCommentPattern, '')
}

export function getStyleElements(): Array<HTMLStyleElement> {
  if (!isBrowser) {
    throw new Error(
      'jest-emotion requires jsdom. See https://jestjs.io/docs/en/configuration#testenvironment-string for more information.'
    )
  }
  const elements = Array.from(document.querySelectorAll('style[data-emotion]'))
  // $FlowFixMe
  return elements
}

const unique = arr => Array.from(new Set(arr))

export function getKeys(elements: Array<HTMLStyleElement>) {
  const keys = unique(
    elements.map(
      element =>
        // $FlowFixMe we know it exists since we query for elements with this attribute
        (element.getAttribute('data-emotion'): string)
    )
  ).filter(Boolean)
  return keys
}

export function hasClassNames(
  classNames: Array<string>,
  selectors: Array<string>,
  target?: string | RegExp
): boolean {
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

export function getMediaRules(rules: Array<Object>, media: string): Array<any> {
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

export function isPrimitive(test: any) {
  return test !== Object(test)
}

export function hasIntersection(left: any[], right: any[]) {
  return left.some(value => right.includes(value))
}
