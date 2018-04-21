import React, { Component } from 'react'

let stylesStr
if (process.env.NODE_ENV === `production`) {
  try {
    // eslint-disable-next-line import/no-webpack-loader-syntax
    stylesStr = require('!raw-loader!../public/styles.css')
  } catch (e) {
    console.error(e) // eslint-disable-line no-console
  }
}

export default class HTML extends Component {
  render() {
    let css
    if (process.env.NODE_ENV === 'production') {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      )
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <script
            dangerouslySetInnerHTML={{
              __html:
                'window.searchError = function() {window.searchErrored = true;};window.searchLoaded = function() {};'
            }}
          />
          {this.props.headComponents}
          {css}
        </head>
        <body>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
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
}
