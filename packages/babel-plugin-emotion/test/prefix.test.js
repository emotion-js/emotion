import { createInlineTests, createExtractTests } from './util'

const cases = {
  'css default prefix': {
    code: `
        css\`
        color: rebeccapurple
        display: flex;
    \``
  },

  'css explicit prefix': {
    code: `
        css\`
        color: rebeccapurple
        display: flex;
    \``,

    opts: { prefix: true }
  },

  'css function prefix': {
    code: `
        css\`
        color: rebeccapurple
        display: flex;
    \``,

    opts: { prefix: (key, value, context) => value === 'flex' }
  },

  'styled prefix': {
    code: `
      styled('div')\`
        color: rebeccapurple
        display: flex;
    \``
  },

  'css unprefixed': {
    code: `
        css\`
        color: rebeccapurple
        display: flex;
    \``,

    opts: { prefix: false }
  },

  'css function unprefixed': {
    code: `
        css\`
        color: rebeccapurple
        display: flex;
    \``,

    opts: { prefix: (key, value, context) => value !== 'flex' }
  },

  'styled unprefixed': {
    code: `
      styled('div')\`
        color: rebeccapurple
        display: flex;
    \``,

    opts: { prefix: false }
  }
}

createInlineTests('prefix', cases)
createExtractTests('prefix', cases)
