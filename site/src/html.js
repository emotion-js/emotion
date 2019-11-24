import React from 'react'

export default function HTML(props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              'window.searchError = function() {window.searchErrored = true;};window.searchLoaded = function() {};'
          }}
        />
        {props.headComponents}
      </head>
      <body>
        <div id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<script src="https://unpkg.com/docsearch.js@2.4.1/dist/cdn/docsearch.min.js" onload="searchLoaded()" async defer onerror="searchError()"></script>'
          }}
        />
      </body>
    </html>
  )
}
