// @flow
import { hashString, Stylis, STYLES_KEY } from 'emotion-utils'
import stylisRuleSheet from 'stylis-rule-sheet'
import {
  processStyleName,
  processStyleValue,
  classnames,
  isBrowser
} from './utils'
import StyleSheet from './sheet'
import type { PrefixOption, StylisOptions, ClassNameArg } from './utils'

type StylisPlugins = Function[] | null | Function

type EmotionCaches = {|
  registered: { [key: string]: string },
  inserted: { [key: string]: string | true },
  nonce?: string,
  key: string
|}

// this should probably be an actual type but it's hard to do without errors
export type Interpolation = any
// | string
// | number
// | void
// | boolean
// | null
// | Object
// | Array<Interpolation>
// | (() => Interpolation)
// | ((props?: Object, context?: Object) => Interpolation)

export type Interpolations = Array<Interpolation>

type CreateStyles<ReturnValue> = (...args: Interpolations) => ReturnValue

export type Emotion = {
  css: CreateStyles<string>,
  cx: (...classNames: Array<ClassNameArg>) => string,
  flush: () => void,
  getRegisteredStyles: (
    registeredStyles: Array<string>,
    classNames: string
  ) => string,
  hydrate: (ids: Array<string>) => void,
  injectGlobal: CreateStyles<void>,
  keyframes: CreateStyles<string>,
  merge: (className: string, sourceMap?: string) => string,
  sheet: StyleSheet,
  caches: EmotionCaches
}

type EmotionOptions = {
  nonce?: string,
  stylisPlugins?: StylisPlugins,
  prefix?: PrefixOption,
  key?: string,
  container?: HTMLElement
}

function createEmotion(
  context: { __SECRET_EMOTION__?: Emotion },
  options?: EmotionOptions
): Emotion {
  if (context.__SECRET_EMOTION__ !== undefined) {
    return context.__SECRET_EMOTION__
  }
  if (options === undefined) options = {}
  let key = options.key || 'css'
  if (process.env.NODE_ENV !== 'production') {
    if (/[^a-z-]/.test(key)) {
      throw new Error(
        `Emotion key must only contain lower case alphabetical characters and - but "${key}" was passed`
      )
    }
  }
  let current
  function insertRule(rule: string) {
    current += rule
    if (isBrowser) {
      sheet.insert(rule, currentSourceMap)
    }
  }

  const insertionPlugin = stylisRuleSheet(insertRule)

  const stylisOptions: StylisOptions = {
    keyframe: false,
    global: false,
    prefix: options.prefix === undefined ? true : options.prefix,
    semicolon: true
  }

  if (process.env.NODE_ENV !== 'production') {
    stylisOptions.compress = false
  }

  const caches = {
    registered: {},
    inserted: {},
    nonce: options.nonce,
    key
  }

  const sheet = new StyleSheet(options)

  if (isBrowser) {
    // 🚀
    sheet.inject()
  }

  let stylis = new Stylis(stylisOptions)
  stylis.use(options.stylisPlugins)(insertionPlugin)

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
        if (interpolation[STYLES_KEY] !== undefined) {
          let selector = interpolation.toString()
          if (
            selector === 'NO_COMPONENT_SELECTOR' &&
            process.env.NODE_ENV !== 'production'
          ) {
            throw new Error(
              'Component selectors can only be used in conjunction with babel-plugin-emotion.'
            )
          }
          return selector
        }
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
        const cached = caches.registered[interpolation]
        return couldBeSelectorInterpolation === false && cached !== undefined
          ? cached
          : interpolation
    }
  }

  const objectToStringCache = new WeakMap()

  function createStringFromObject(obj: {
    [key: string]: Interpolation
  }): string {
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
        if (typeof obj[key] !== 'object') {
          if (caches.registered[obj[key]] !== undefined) {
            string += `${key}{${caches.registered[obj[key]]}}`
          } else {
            string += `${processStyleName(key)}:${processStyleValue(
              key,
              obj[key]
            )};`
          }
        } else {
          if (
            key === 'NO_COMPONENT_SELECTOR' &&
            process.env.NODE_ENV !== 'production'
          ) {
            throw new Error(
              'Component selectors can only be used in conjunction with babel-plugin-emotion.'
            )
          }

          string += `${key}{${handleInterpolation.call(this, obj[key], false)}}`
        }
      }, this)
    }
    objectToStringCache.set(obj, string)

    return string
  }

  let name
  let stylesWithLabel

  const labelPattern = /label:\s*([^\s;\n{]+)\s*;/g

  const createStyles: CreateStyles<string> = function(
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
      styles += strings[0]
    }

    interpolations.forEach(function(interpolation, i) {
      styles += handleInterpolation.call(
        this,
        interpolation,
        styles.charCodeAt(styles.length - 1) === 46 // .
      )
      if (stringMode === true && strings[i + 1] !== undefined) {
        styles += strings[i + 1]
      }
    }, this)
    stylesWithLabel = styles
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
    if (caches.inserted[name] === undefined) {
      current = ''
      stylis(scope, styles)
      caches.inserted[name] = current
    }
  }
  const css: CreateStyles<string> = function css() {
    const styles = createStyles.apply(this, arguments)
    const selector = `${key}-${name}`

    if (caches.registered[selector] === undefined) {
      caches.registered[selector] = stylesWithLabel
    }
    insert(`.${selector}`, styles)

    return selector
  }

  const keyframes: CreateStyles<string> = function keyframes() {
    const styles = createStyles.apply(this, arguments)
    const animation = `animation-${name}`
    insert('', `@keyframes ${animation}{${styles}}`)

    return animation
  }

  const injectGlobal: CreateStyles<void> = function injectGlobal() {
    const styles = createStyles.apply(this, arguments)
    insert('', styles)
  }

  function getRegisteredStyles(registeredStyles: string[], classNames: string) {
    let rawClassName = ''

    classNames.split(' ').forEach(className => {
      if (caches.registered[className] !== undefined) {
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

  function cx(...classNames: Array<ClassNameArg>) {
    return merge(classnames(classNames))
  }

  function hydrateSingleId(id: string) {
    caches.inserted[id] = true
  }

  function hydrate(ids: string[]) {
    ids.forEach(hydrateSingleId)
  }

  function flush() {
    if (isBrowser) {
      sheet.flush()
      sheet.inject()
    }
    caches.inserted = {}
    caches.registered = {}
  }

  if (isBrowser) {
    let chunks = document.querySelectorAll(`[data-emotion-${key}]`)
    Array.prototype.forEach.call(chunks, node => {
      // $FlowFixMe
      sheet.tags[0].parentNode.insertBefore(node, sheet.tags[0])
      // $FlowFixMe
      node
        .getAttribute(`data-emotion-${key}`)
        .split(' ')
        .forEach(hydrateSingleId)
    })
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
    caches
  }
  context.__SECRET_EMOTION__ = emotion
  return emotion
}

export default createEmotion
