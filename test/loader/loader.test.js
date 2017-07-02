/* eslint-env jest */
import * as fs from 'fs'
import loader from '../../src/loader'

function runLoader (loader, input, map, addOptions, callback) {
  var opt = {
    options: {
      context: ''
    },
    callback: callback,
    async: function () {
      return callback
    },
    loaders: [{ request: '/path/emotion-loader' }],
    loaderIndex: 0,
    context: '',
    resource: 'test.css',
    resourcePath: 'test.css',
    request: 'css-loader!test.css',
    emitError: function (message) {
      throw new Error(message)
    }
  }
  Object.keys(addOptions).forEach(function (key) {
    opt[key] = addOptions[key]
  })
  loader.call(opt, input, map)
}

const source = `
:local(.anchor) {
  color: blue;
}
:local(.link) {
  text-decoration: none;
  transition: color .15s ease-in;
}

:local(.link:link),
:local(.link:visited) {
  transition: color .15s ease-in;
}

.link:hover {
  transition: color .15s ease-in;
}

.link:active {
  transition: color .15s ease-in;
}

.link:focus {
  transition: color .15s ease-in;
  outline: 1px dotted currentColor;
}
`

describe('loader', () => {
  test('smoke', done => {
    runLoader(loader, source, undefined, '', function (err, output) {
      if (err) return done(err)
      console.log(JSON.stringify(output, null, 2))
      expect(output).toMatchSnapshot()
      done()
    })
  })
})
