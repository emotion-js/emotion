// @flow

function flatMap(arr, iteratee) {
  return [].concat(...arr.map(iteratee))
}

export const RULE_TYPES = {
  media: 'media',
  rule: 'rule'
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

function getClassNamesFromEnzyme(selectors, node) {
  // We need to dive if we have selected a styled child from a shallow render
  const actualComponent = shouldDive(node) ? node.dive() : node
  // Find the first node with a className prop
  const components = actualComponent.findWhere(isTagWithClassName)
  const classes = components.length && components.first().prop('className')

  return getClassNames(selectors, classes)
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

let keyframesPattern = /^@keyframes\s+(animation-[^{\s]+)+/

let removeCommentPattern = /\/\*[\s\S]*?\*\//g

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
  let keys = getKeys(elements)
  if (!keys.length) {
    return ''
  }

  let keyPatten = new RegExp(`^(${keys.join('|')})-`)
  let filteredClassNames = classNames.filter(className =>
    keyPatten.test(className)
  )
  if (!filteredClassNames.length) {
    return ''
  }
  let selectorPattern = new RegExp('\\.(' + filteredClassNames.join('|') + ')')
  let keyframes = {}
  let styles = ''

  flatMap(elements, getElementRules).forEach(rule => {
    if (selectorPattern.test(rule)) {
      styles += rule
    }
    let match = rule.match(keyframesPattern)
    if (match !== null) {
      let name = match[1]
      if (keyframes[name] === undefined) {
        keyframes[name] = ''
      }
      keyframes[name] += rule
    }
  })
  let keyframeNameKeys = Object.keys(keyframes)
  let keyframesStyles = ''

  if (keyframeNameKeys.length) {
    let keyframesNamePattern = new RegExp(keyframeNameKeys.join('|'), 'g')
    let keyframesNameCache = {}
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
  let elements = Array.from(document.querySelectorAll('style[data-emotion]'))
  // $FlowFixMe
  return elements
}

let unique = arr => Array.from(new Set(arr))

export function getKeys(elements: Array<HTMLStyleElement>) {
  let keys = unique(
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
      return classNames.includes(selector.slice(1))
    }
    // check if selector (className) of specific css rule match target
    return target instanceof RegExp
      ? target.test(selector)
      : selector.includes(target)
  })
}

export function getMediaRules(rules: Array<Object>, media: string): Array<any> {
  return rules
    .filter(rule => {
      const isMediaMatch = rule.media
        ? rule.media.replace(/\s/g, '').includes(media.replace(/\s/g, ''))
        : false
      return rule.type === RULE_TYPES.media && isMediaMatch
    })
    .reduce((mediaRules, mediaRule) => mediaRules.concat(mediaRule.rules), [])
}
