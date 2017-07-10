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
.anchor {
 font-size: 30px;
}

.link {
  color: black;
  text-decoration: none;
  transition: color .15s ease-in;
}

.link:link,
.link:visited {
  color: blue;
  transition: color .15s ease-in;
}

.link:hover {
  color: green;
  transition: color .15s ease-in;
}

.link:active {
  color: red;
  transition: color .15s ease-in;
}

.link:focus {
  color: yellow;
  transition: color .15s ease-in;
  outline: 1px dotted currentColor;
}

`

describe('loader', () => {
  test('smoke', done => {
    runLoader(loader, source, undefined, '', function (err, output) {
      if (err) return done(err)
      console.log(output)
      expect(output).toMatchSnapshot()
      done()
    })
  })
})
