// @flow
import { createInlineTests } from 'old-babel-tester'

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

  'code already transpiled by emotion plugin (avoid double transpilation)': {
    code: `
    import { keyframes as _keyframes } from "emotion";
    import { css as _css } from "emotion";

    function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from \`css\` function. It isn't supposed to be used directly (e.g. as value of the \`className\` prop), but rather handed to emotion so it can handle it (e.g. as value of \`css\` prop)."; }

    let someCls =
    /*#__PURE__*/
    _css(process.env.NODE_ENV === "production" ? {
      name: "1jwq1yt-someCls",
      styles: "color:hotpink;;label:someCls;"
    } : {
      name: "1jwq1yt-someCls",
      styles: "color:hotpink;;label:someCls;",
      map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvZXMtbm90LWRvdWJsZS1sYWJlbC1hbHJlYWR5LXRyYW5zcGlsZWQtY29kZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHaUIiLCJmaWxlIjoiZG9lcy1ub3QtZG91YmxlLWxhYmVsLWFscmVhZHktdHJhbnNwaWxlZC1jb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVE9ETzogdGhlb3JldGljYWxsdCBgZW1vdGlvbmAgc2hvdWxkIGJlIG1lbnRpb25lZCBpbiB0aGlzIHRlc3QgLSBzbyBwcm9iYWJseSB3ZSdkIGxpa2UgdG8gbW92ZSB0aGlzIHRlc3QgYXJvdW5kXG5pbXBvcnQgeyBjc3MsIGtleWZyYW1lcyB9IGZyb20gJ2Vtb3Rpb24nXG5cbmxldCBzb21lQ2xzID0gY3NzYFxuICBjb2xvcjogaG90cGluaztcbmBcblxubGV0IHJvdGF0ZTM2MCA9IGtleWZyYW1lc2BcbiAgZnJvbSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gIH1cbiAgdG8ge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG4gIH1cbmBcbiJdfQ== */",
      toString: _EMOTION_STRINGIFIED_CSS_ERROR__
    });

    let rotate360 =
    /*#__PURE__*/
    _keyframes(process.env.NODE_ENV === "production" ? {
      name: "1k98dea-rotate360",
      styles: "from{transform:rotate(0deg);}to{transform:rotate(360deg);};label:rotate360;"
    } : {
      name: "1k98dea-rotate360",
      styles: "from{transform:rotate(0deg);}to{transform:rotate(360deg);};label:rotate360;",
      map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvZXMtbm90LWRvdWJsZS1sYWJlbC1hbHJlYWR5LXRyYW5zcGlsZWQtY29kZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPeUIiLCJmaWxlIjoiZG9lcy1ub3QtZG91YmxlLWxhYmVsLWFscmVhZHktdHJhbnNwaWxlZC1jb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVE9ETzogdGhlb3JldGljYWxsdCBgZW1vdGlvbmAgc2hvdWxkIGJlIG1lbnRpb25lZCBpbiB0aGlzIHRlc3QgLSBzbyBwcm9iYWJseSB3ZSdkIGxpa2UgdG8gbW92ZSB0aGlzIHRlc3QgYXJvdW5kXG5pbXBvcnQgeyBjc3MsIGtleWZyYW1lcyB9IGZyb20gJ2Vtb3Rpb24nXG5cbmxldCBzb21lQ2xzID0gY3NzYFxuICBjb2xvcjogaG90cGluaztcbmBcblxubGV0IHJvdGF0ZTM2MCA9IGtleWZyYW1lc2BcbiAgZnJvbSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gIH1cbiAgdG8ge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG4gIH1cbmBcbiJdfQ== */",
      toString: _EMOTION_STRINGIFIED_CSS_ERROR__
    });
    `,
    filename: __filename
  }
}
createInlineTests('babel css inline', inline)
