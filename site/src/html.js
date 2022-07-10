import React from 'react'

const trapCarbon = () => {
  let carbon
  Object.defineProperty(window, '_carbonads', {
    configurable: true,
    set(val) {
      const { init } = val
      carbon = val
      carbon.init = () => {}
      carbon.init._orig = init
    },
    get() {
      return carbon
    }
  })
}

const tweakCarbon = () => {
  const restoreAndWrap = carbon => {
    const { _orig } = carbon.init
    carbon.init = function (_where, ...args) {
      window.__carbonReady = true
      const where = document.querySelector('.carbon-wrapper')

      // Gatsby is not SSRing during development
      if (process.env.NODE_ENV === 'development' && !where) {
        // using load event was not reliable here, sometimes the React tree was still not mounted
        const timer = setInterval(() => {
          if (document.querySelector('.carbon-wrapper')) {
            clearInterval(timer)
            carbon.init.call(this, null, ...args)
          }
        }, 100)
        return
      }

      return _orig.call(this, where, ...args)
    }
    delete window._carbonads
    window._carbonads = carbon
  }

  const carbon = window._carbonads
  if (carbon) {
    restoreAndWrap(carbon)
    window._carbonads.init()

    return
  }

  const currentTrap = Object.getOwnPropertyDescriptor(window, '_carbonads')
  Object.defineProperty(window, '_carbonads', {
    configurable: true,
    set(val) {
      currentTrap.set(val)
      restoreAndWrap(val)
      // in this scenario we let the true carbon script to call .init()
    },
    get: currentTrap.get
  })
}

export default function HTML(props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <script
          dangerouslySetInnerHTML={{
            __html: [
              'window.searchError = function() {window.searchErrored = true;};',
              'window.searchLoaded = function() {};',
              `(${trapCarbon})();`
            ].join('')
          }}
        />
        <script
          async
          id="_carbonads_js"
          src="https://cdn.carbonads.com/carbon.js?serve=CESDV5QY&placement=emotionsh"
        />
        {props.headComponents}
      </head>
      <body>
        <div id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
        <script
          dangerouslySetInnerHTML={{
            __html: `(${tweakCarbon})()`
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<script src="https://unpkg.com/docsearch.js@2.4.1/dist/cdn/docsearch.min.js" onload="searchLoaded()" async onerror="searchError()"></script>'
          }}
        />
      </body>
    </html>
  )
}
