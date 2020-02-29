// @flow
import { createInlineTests } from 'old-babel-tester'
import path from 'path'

const inline = {
  'label format with only local': {
    code: `
    import {css} from 'emotion'
    let cls = css({color:'hotpink'})
    `,
    opts: {
      labelFormat: 'my-css-[local]',
      autoLabel: true
    },
    filename: __filename
  },
  'label format with filename that is index and local': {
    code: `
    import {css} from 'emotion'
    let cls = css({color:'hotpink'})
    `,
    opts: {
      labelFormat: 'my-css-[filename]-[local]',
      autoLabel: true
    },
    filename: 'some-directory/index.js'
  },

  'label format with filename and local': {
    code: `
    import {css} from 'emotion'
    let cls = css({color:'hotpink'})
    `,
    opts: {
      labelFormat: 'my-css-[filename]-[local]',
      autoLabel: true
    },
    filename: __filename
  },

  'label format with dirname, filename, and local': {
    code: `
    import {css} from 'emotion'
    let cls = css({color:'hotpink'})
    `,
    opts: {
      labelFormat: 'my-css-[dirname]-[filename]-[local]',
      autoLabel: true
    },
    filename: __filename
  },

  // this test has better readability for label alone than other ones which include source maps
  'label on code transpiled by TS': {
    code: `
    import { __makeTemplateObject } from 'tslib'
    import css from '@emotion/css'

    var templateObject_1

    const someVar = css(
      templateObject_1 ||
        (templateObject_1 = __makeTemplateObject(
          ['\\n  color: hotpink;\\n'],
          ['\\n  color: hotpink;\\n']
        ))
    )
    `,
    opts: {
      autoLabel: true,
      sourceMap: false
    },
    filename: __filename
  },

  'label on code transpiled by TS (with interpolations) ': {
    code: `
    import { __makeTemplateObject } from 'tslib'
    import css from '@emotion/css'
    import { hoverStyles } from './styles'

    var templateObject_1

    const someVar = css(
      templateObject_1 ||
        (templateObject_1 = __makeTemplateObject(
          ['\\n  color: hotpink;\\n'],
          ['\\n  color: hotpink;\\n']
        )),
      hoverStyles
    )
    `,
    opts: {
      autoLabel: true,
      sourceMap: false
    },
    filename: __filename
  },

  'custom instance': {
    code: `
    import {css as lol} from 'my-emotion-instance'
    lol\`color:hotpink;\``,
    opts: {
      instances: ['my-emotion-instance']
    },
    filename: __filename
  },
  'custom instance relative': {
    code: `
    import {css as lol} from './my-emotion-instance'
    lol\`color:hotpink;\``,
    opts: {
      instances: [path.join(__dirname, './my-emotion-instance')]
    },
    filename: __filename
  },
  'custom instance relative complex': {
    code: `
    import {css as lol} from '../__tests__/my-emotion-instance'
    lol\`color:hotpink;\``,
    opts: {
      instances: [path.join(__dirname, './my-emotion-instance')]
    },
    filename: __filename
  }
}
createInlineTests('babel css inline', inline)
