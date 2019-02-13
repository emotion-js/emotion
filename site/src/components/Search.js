// @flow
import React from 'react'
import { navigate } from '@reach/router'
import { algoliaStyles } from '../utils/algolia-styles'
import { addCallback } from '../utils/async-load-search'
import { colors, mq } from '../utils/style'

type Props = {}

type State = {
  enabled: boolean
}

let a

if (typeof window !== 'undefined') {
  a = document.createElement('a')
}

function getHash(url) {
  a.href = url
  return a.hash
}

// https://feathericons.com search
const icon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48Y2lyY2xlIGN4PSIxMSIgY3k9IjExIiByPSI4Ii8+PHBhdGggZD0iTTIxIDIxbC00LjM1LTQuMzUiLz48L3N2Zz4='

class Search extends React.Component<Props, State> {
  input: ?HTMLInputElement
  state = { enabled: true }
  componentDidMount() {
    addCallback(loaded => {
      if (loaded) {
        window.docsearch({
          apiKey: 'd160789a17f10ba962c4bce1b298fbbb',
          indexName: 'emotion_sh',
          inputSelector: '#algolia-doc-search',
          handleSelected: (input, event, suggestion) => {
            event.preventDefault()
            input.setVal('')
            input.close()
            if (this.input) {
              this.input.blur()
            }

            const url = suggestion.url.replace('https://emotion.sh', '')
            navigate(url)
            var hash = window.decodeURI(getHash(url))

            if (hash !== '#' && hash !== '') {
              var element = document.querySelector(
                `.docSearch-content ${hash} a`
              )
              if (element) {
                element.click()
              }
            }
          }
        })
      } else {
        // eslint-disable-next-line no-console
        console.warn('Search has failed to load and is now disabled')
        this.setState({ enabled: false })
      }
    })
  }

  render() {
    return this.state.enabled ? (
      <form
        className={this.props.className}
        css={[
          mq({
            zIndex: 100,
            display: ['flex', 'flex', 'flex'],
            gridColumn: ['1 / span 2', undefined, 'auto'],
            gridRow: ['2', '2', 'auto'],
            alignItems: 'center',
            '& span.algolia-autocomplete': {
              flex: 1
            }
          }),
          algoliaStyles
        ]}
      >
        <input
          css={{
            width: '100%',
            border: 0,
            fontSize: 16,
            borderRadius: 4,
            background: 'transparent',
            padding: `8px 16px 8px 16px`,
            backgroundImage: `url(${icon})`,
            backgroundSize: '16px 16px',
            backgroundRepeat: 'no-repeat',
            backgroundPositionY: 'center',
            backgroundPositionX: 5,
            backgroundColor: colors.color,
            color: colors.bg,
            outline: 0,
            // width: 16,
            margin: 0,
            appearance: 'none',
            transition:
              'width 200ms ease,padding 200ms ease, background-color 100ms ease',
            '@media (max-width: 600px)': {
              ':focus': {
                paddingLeft: 29,
                width: '100%'
              }
            },
            '@media (min-width: 601px)': {
              width: '100%',
              paddingLeft: 29
            }
          }}
          ref={ele => {
            this.input = ele
          }}
          id="algolia-doc-search"
          type="search"
          placeholder="Search..."
          aria-label="Search..."
        />
      </form>
    ) : null
  }
}

export default Search
