/* eslint-env jest */
import isDevelopment from '#is-development'
import 'raf/polyfill'
import prettyCSS from './pretty-css'

const hasOwn = {}.hasOwnProperty

const t = globalThis.test
const d = globalThis.describe

const defaultFlags = {
  development: true
}

const enabledGlobalFlags = {
  development: isDevelopment
}

function shouldRun(flags) {
  return Object.keys(flags).every(
    flag => enabledGlobalFlags[flag] === flags[flag]
  )
}

globalThis.gate = (flags, cb) => {
  const usedFlags = Object.keys(flags).filter(flags => !!flags[flags])

  for (const flag of Object.keys(flags)) {
    if (!hasOwn.call(defaultFlags, flag)) {
      throw new Error(`Invalid flag: ${flag}`)
    }
  }

  const allFlags = {
    ...defaultFlags,
    ...flags
  }

  return shouldRun(allFlags) ? cb({ test: t }) : cb({ test: t.skip })
}

const shouldRunByDefault = shouldRun(defaultFlags)

globalThis.test = (...args) => {
  if (!shouldRunByDefault) {
    return t.skip(...args)
  }
  return t(...args)
}
globalThis.test.each = (...args) => {
  if (!shouldRunByDefault) {
    return t.skip.each(...args)
  }
  return t.each(...args)
}
globalThis.test.only = t.only
globalThis.test.skip = t.skip

globalThis.describe = (...args) => {
  if (!shouldRunByDefault) {
    return d.skip(...args)
  }
  return d(...args)
}
globalThis.describe.each = (...args) => {
  if (!shouldRunByDefault) {
    return d.skip.each(...args)
  }
  return d.each(...args)
}
globalThis.describe.only = d.only
globalThis.describe.skip = d.skip

if (typeof Node !== 'undefined') {
  let oldInsertBefore = Node.prototype.insertBefore
  Node.prototype.insertBefore = function (node, refNode) {
    if (refNode instanceof Node || refNode === null) {
      return oldInsertBefore.call(this, node, refNode)
    }
    throw new Error(
      'insertBefore only accepts a refNode which is null or a Node'
    )
  }
}

expect.addSnapshotSerializer(prettyCSS)
