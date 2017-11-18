// @flow
import { hashString, Stylis } from 'emotion-utils'
import stylisRuleSheet from 'stylis-rule-sheet'
import { processStyleName, processStyleValue, classnames } from './utils'
import StyleSheet from './sheet'

type StylisPlugins = Function[] | null | Function

type EmotionCaches = {
  registered: { [key: string]: string },
  inserted: { [key: string]: string | true },
  stylis: (scope: string, styles: string) => string,
  sheet: StyleSheet
}

export type Interpolation =
  | string
  | number
  | void
  | boolean
  | Object
  | Array<Interpolation>
  | Array<any>
  | (() => Interpolation)
  | ((props?: Object, context?: Object) => Interpolation)

export type Interpolations = Array<Interpolation>

export type Emotion = {
  css: (...args: Interpolations) => string,
  cx: (...classNames: any) => string,
  flush: () => void,
  getRegisteredStyles: (
    registeredStyles: Array<string>,
    classNames: string
  ) => string,
  hydrate: (ids: Array<string>) => void,
  injectGlobal: (...args: Interpolations) => void,
  inserted: {},
  keyframes: (...args: Interpolations) => string,
  merge: (className: string, sourceMap?: string) => string,
  registered: {},
  sheet: StyleSheet
}

type EmotionOptions = { nonce?: string, stylisPlugins?: StylisPlugins }

function createEmotion(
  context: { __SECRET_EMOTION__?: EmotionCaches },
  options?: EmotionOptions
): Emotion {
  if (options === undefined) options = {}
  // $FlowFixMe
  let caches: EmotionCaches = context.__SECRET_EMOTION__
  let current

  function insertRule(rule: string) {
    current += rule
    sheet.insert(rule, currentSourceMap)
  }

  const insertionPlugin = stylisRuleSheet(insertRule)

  if (caches === undefined) {
    const stylisOptions: { keyframe?: boolean, compress?: boolean } = {
      keyframe: false
    }

    if (process.env.NODE_ENV !== 'production') {
      stylisOptions.compress = false
    }
    context.__SECRET_EMOTION__ = caches = {
      registered: {},
      inserted: {},
      sheet: new StyleSheet(options.nonce),
      stylis: new Stylis(stylisOptions)
    }

    caches.stylis.use(options.stylisPlugins)(insertionPlugin)
    // 🚀
    caches.sheet.inject()
  }

  let stylis = caches.stylis
  let sheet = caches.sheet

  let registered = {}

  let inserted = {}

  let currentSourceMap = ''

  function handleInterpolation(
    interpolation: Interpolation,
    couldBeSelectorInterpolation: boolean
  ): string | number {
    if (interpolation == null) {
      return ''
    }

    switch (typeof interpolation) {
      case 'boolean':
        return ''
      case 'function':
        return handleInterpolation.call(
          this,
          this === undefined
            ? interpolation()
            : // $FlowFixMe
              interpolation(this.mergedProps, this.context),
          couldBeSelectorInterpolation
        )
      case 'object':
        return createStringFromObject.call(this, interpolation)
      default:
        const cached: string | void = registered[interpolation]
        return couldBeSelectorInterpolation === false && cached !== undefined
          ? cached
          : interpolation
    }
  }

  const objectToStringCache = new WeakMap()

  function createStringFromObject(obj: Object | any[]): string {
    if (objectToStringCache.has(obj)) {
      // $FlowFixMe
      return objectToStringCache.get(obj)
    }
    let string = ''

    if (Array.isArray(obj)) {
      obj.forEach(function(interpolation: Interpolation) {
        string += handleInterpolation.call(this, interpolation, false)
      }, this)
    } else {
      Object.keys(obj).forEach(function(key: string) {
        // $FlowFixMe
        if (typeof obj[key] !== 'object') {
          if (registered[obj[key]] !== undefined) {
            string += `${key}{${registered[obj[key]]}}`
          } else {
            string += `${processStyleName(key)}:${processStyleValue(
              key,
              // $FlowFixMe
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

  let name

  const labelPattern = /label:\s*([^\s;\n]+)\s*[;\n]/g

  function createStyles(
    strings: Interpolation | string[],
    ...interpolations: Interpolation[]
  ) {
    let stringMode = true
    let styles: string = ''
    let identifierName = ''

    if (strings == null || strings.raw === undefined) {
      stringMode = false
      styles += handleInterpolation.call(this, strings, false)
    } else {
      // $FlowFixMe
      styles += strings[0]
    }

    interpolations.forEach(function(interpolation, i) {
      styles += handleInterpolation.call(
        this,
        interpolation,
        styles.charCodeAt(styles.length - 1) === 46 // .
      )
      // $FlowFixMe
      if (stringMode === true && strings[i + 1] !== undefined) {
        // $FlowFixMe
        styles += strings[i + 1]
      }
    }, this)
    styles = styles.replace(labelPattern, (match, p1: string) => {
      identifierName += `-${p1}`
      return ''
    })
    name = hashString(styles + identifierName) + identifierName
    return styles
  }

  if (process.env.NODE_ENV !== 'production') {
    const sourceMapRegEx = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//
    const oldStylis = stylis
    stylis = (selector, styles) => {
      const result = sourceMapRegEx.exec(styles)
      currentSourceMap = result ? result[0] : ''
      oldStylis(selector, styles)
      currentSourceMap = ''
    }
  }
  function insert(scope, styles) {
    if (inserted[name] === undefined) {
      current = ''
      stylis(scope, styles)
      inserted[name] = current
    }
  }
  function css(...args: Interpolation[]) {
    const styles = createStyles.apply(this, arguments)
    const selector = `css-${name}`

    if (registered[selector] === undefined) {
      registered[selector] = styles
    }
    insert(`.${selector}`, styles)

    return selector
  }

  function keyframes(...args: Interpolation[]) {
    const styles = createStyles(...args)
    const animation = `animation-${name}`
    insert('', `@keyframes ${animation}{${styles}}`)

    return animation
  }

  function injectGlobal(...args: Interpolation[]) {
    const styles = createStyles(...args)
    insert('', styles)
  }

  function getRegisteredStyles(registeredStyles: string[], classNames: string) {
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

  function merge(className: string, sourceMap?: string) {
    const registeredStyles = []

    const rawClassName = getRegisteredStyles(registeredStyles, className)

    if (registeredStyles.length < 2) {
      return className
    }
    return rawClassName + css(registeredStyles, sourceMap)
  }

  function cx(...classNames: any) {
    return merge(classnames(...classNames))
  }

  function hydrate(ids: string[]) {
    ids.forEach(id => {
      inserted[id] = true
    })
  }

  function flush() {
    sheet.flush()
    inserted = caches.inserted = {}
    registered = caches.registered = {}
    sheet.inject()
  }

  const emotion = {
    flush,
    hydrate,
    cx,
    merge,
    getRegisteredStyles,
    injectGlobal,
    keyframes,
    css,
    sheet,
    registered,
    inserted
  }
  return emotion
}

export default createEmotion
