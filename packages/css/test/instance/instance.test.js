// @flow
import createEmotion from '@emotion/css/create-instance'
import { container, css, sheet } from './emotion-instance'
import { safeQuerySelector } from 'test-utils'
import hashString from '@emotion/hash'

describe('general instance tests', () => {
  test('inserts style tags into container', () => {
    css`
      display: flex;
    `
    sheet.tags.forEach(tag => {
      expect(tag.getAttribute('data-emotion')).toBe('some-key')
      expect(tag.getAttribute('nonce')).toBe('some-nonce')
      expect(tag.parentNode).toBe(container)
    })
  })
  test('throws with invalid key', () => {
    expect(() => {
      createEmotion({ key: 'css1' })
    }).toThrowErrorMatchingSnapshot()
  })
})

describe('multiple instance tests', () => {
  test(`a second instance with the same key doesn't clobber the styles of the first (https://github.com/emotion-js/emotion/issues/2210)`, () => {
    const key = 'shared-key-one'

    const emotion1 = createEmotion({ key, speedy: true })
    const class1 = emotion1.css(`background-color: yellow`)

    // Note: must create second instance after a rule has already been inserted
    // for the first instance to exemplify the style-loss problem in v11.1.3
    const emotion2 = createEmotion({ key, speedy: true })
    const class2 = emotion2.css(`color: blue`)

    const computedStyle = getComputedStyle(`${class1} ${class2}`)
    expect(computedStyle.backgroundColor).toBe('yellow') // from 'class1' - this would fail in v11.1.3
    expect(computedStyle.color).toBe('blue') // from 'class2'
  })

  describe('when rehydrating with multiple Emotion instances that have the same key', () => {
    test(`only the first instance owns the SSR <style> tag and prevents re-insertion of existing classes (discussion on https://github.com/emotion-js/emotion/pull/2222)`, () => {
      const key = 'shared-key-two'
      const css = `background-color: green;`
      const hash = hashString(css)
      const ssrClass = `${key}-${hash}`
      safeQuerySelector(
        'head'
      ).innerHTML = `<style data-emotion="${key} ${hash}">.${ssrClass}{${css}}</style>`
      const styleEl = safeQuerySelector(`style[data-emotion="${key} ${hash}"]`)

      // First Emotion instance picks up the SSR <style> tag as its own
      const emotion1 = createEmotion({ key, speedy: true })
      const class1 = emotion1.css(css)
      expect(class1).toBe(ssrClass) // same exact class name
      expect(emotion1.sheet.tags).toEqual([styleEl]) // <style> element picked up from hydration
      expect((styleEl: any).sheet.cssRules.map(r => r.cssText)).toEqual([
        // no new rule inserted for insertion of same css text
        `.${ssrClass} {${css}}`
      ])

      // Since only one StyleSheet instance can ever own a `<style>` element,
      // the second one creates its own
      const emotion2 = createEmotion({ key, speedy: true })
      const class2 = emotion2.css(css)
      expect(class2).toBe(ssrClass) // same exact class name due to same hashing
      expect(emotion2.sheet.tags[0]).not.toBe(styleEl) // brand new <style> element (not the SSR one)
      expect((styleEl: any).sheet.cssRules.map(r => r.cssText)).toEqual([
        // new rule inserted - duplicate of the rule in emotion1, see discussion
        // at https://github.com/emotion-js/emotion/pull/2222
        `.${ssrClass} {${css}}`
      ])
    })

    test(`both instances allow additional rules after hydration`, () => {
      const key = 'shared-key-three'
      const css = `background-color: red`
      const hash = hashString(css)
      const ssrClass = `${key}-${hash}`
      safeQuerySelector(
        'head'
      ).innerHTML = `<style data-emotion="${key} ${hash}">.${ssrClass}{${css}}</style>`

      const emotion1 = createEmotion({ key, speedy: true })
      const class1 = emotion1.css(`text-decoration: underline`)

      const emotion2 = createEmotion({ key, speedy: true })
      const class2 = emotion2.css(`color: blue`)

      const computedStyle = getComputedStyle(`${ssrClass} ${class1} ${class2}`)
      expect(computedStyle.backgroundColor).toBe('red') // from 'ssrClass'
      expect(computedStyle.textDecoration).toBe('underline') // from 'class1' - this would fail in v11.1.3
      expect(computedStyle.color).toBe('blue') // from 'class2'
    })

    test(`flushing the second Emotion instance's sheet leaves the SSR <style> tag intact`, () => {
      const key = 'shared-key-four'
      const css = `background-color: purple`
      const hash = hashString(css)
      const ssrClass = `${key}-${hash}`
      safeQuerySelector(
        'head'
      ).innerHTML = `<style data-emotion="${key} ${hash}">.${ssrClass}{${css}}</style>`
      const styleEl = safeQuerySelector(`style[data-emotion="${key} ${hash}"]`)

      const emotion1 = createEmotion({ key, speedy: true })
      const class1 = emotion1.css(`text-decoration: underline`)

      const emotion2 = createEmotion({ key, speedy: true })
      const class2 = emotion2.css(`color: orange`)
      emotion2.sheet.flush() // delete

      const computedStyle = getComputedStyle(`${ssrClass} ${class1} ${class2}`)
      expect(computedStyle.backgroundColor).toBe('purple') // from 'ssrClass'
      expect(computedStyle.textDecoration).toBe('underline') // from 'class1'
      expect(computedStyle.color).toBe('') // 'class2' has been deleted, so no color
    })
  })

  function getComputedStyle(className) {
    const divEl = document.createElement('div')
    divEl.className = className
    ;(document: any).body.appendChild(divEl)

    return window.getComputedStyle(divEl)
  }
})
