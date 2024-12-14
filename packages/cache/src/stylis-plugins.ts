import { EmotionCache } from '@emotion/utils'
import { Element, Middleware } from 'stylis'

export let removeLabel: Middleware = element => {
  if (element.type === 'decl') {
    const value = element.value
    if (
      // charcode for l
      value.charCodeAt(0) === 108 &&
      // charcode for b
      value.charCodeAt(2) === 98
    ) {
      // this ignores label
      element.return = ''
      element.value = ''
    }
  }
}

const ignoreFlag =
  'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason'

const isIgnoringComment = (element: Element) =>
  element.type === 'comm' &&
  (element.children as string).indexOf(ignoreFlag) > -1

export let createUnsafeSelectorsAlarm =
  (cache: Pick<EmotionCache, 'compat'>): Middleware =>
  (element, index, children) => {
    if (element.type !== 'rule' || cache.compat) return

    const unsafePseudoClasses = element.value.match(
      /(:first|:nth|:nth-last)-child/g
    )

    if (unsafePseudoClasses) {
      const isNested = !!element.parent
      // in nested rules comments become children of the "auto-inserted" rule and that's always the `element.parent`
      //
      // considering this input:
      // .a {
      //   .b /* comm */ {}
      //   color: hotpink;
      // }
      // we get output corresponding to this:
      // .a {
      //   & {
      //     /* comm */
      //     color: hotpink;
      //   }
      //   .b {}
      // }
      const commentContainer = isNested
        ? element.parent!.children
        : // global rule at the root level
          children

      for (let i = commentContainer.length - 1; i >= 0; i--) {
        const node = commentContainer[i] as Element

        if (node.line < element.line) {
          break
        }

        // it is quite weird but comments are *usually* put at `column: element.column - 1`
        // so we seek *from the end* for the node that is earlier than the rule's `element` and check that
        // this will also match inputs like this:
        // .a {
        //   /* comm */
        //   .b {}
        // }
        //
        // but that is fine
        //
        // it would be the easiest to change the placement of the comment to be the first child of the rule:
        // .a {
        //   .b { /* comm */ }
        // }
        // with such inputs we wouldn't have to search for the comment at all
        // TODO: consider changing this comment placement in the next major version
        if (node.column < element.column) {
          if (isIgnoringComment(node)) {
            return
          }
          break
        }
      }

      unsafePseudoClasses.forEach(unsafePseudoClass => {
        console.error(
          `The pseudo class "${unsafePseudoClass}" is potentially unsafe when doing server-side rendering. Try changing it to "${
            unsafePseudoClass.split('-child')[0]
          }-of-type".`
        )
      })
    }
  }

let isImportRule = (element: Element) =>
  element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64

const isPrependedWithRegularRules = (index: number, children: Element[]) => {
  for (let i = index - 1; i >= 0; i--) {
    if (!isImportRule(children[i])) {
      return true
    }
  }
  return false
}

// use this to remove incorrect elements from further processing
// so they don't get handed to the `sheet` (or anything else)
// as that could potentially lead to additional logs which in turn could be overhelming to the user
const nullifyElement = (element: Element) => {
  element.type = ''
  element.value = ''
  element.return = ''
  element.children = ''
  element.props = ''
}

export let incorrectImportAlarm: Middleware = (element, index, children) => {
  if (!isImportRule(element)) {
    return
  }

  if (element.parent) {
    console.error(
      "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."
    )
    nullifyElement(element)
  } else if (isPrependedWithRegularRules(index, children)) {
    console.error(
      "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."
    )
    nullifyElement(element)
  }
}
