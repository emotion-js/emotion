// @flow
import React from 'react'
import { withRouter } from 'react-router'

type Props = {
  history: { push: string => void }
}

type State = {
  enabled: boolean
}

class Search extends React.Component<Props, State> {
  input: ?HTMLInputElement
  state = {
    enabled: true
  }
  componentDidMount() {
    if (window.docsearch) {
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
          this.props.history.push(
            suggestion.url.replace('https://emotion.sh', '')
          )
        }
      })
    } else {
      // eslint-disable-next-line no-console
      console.warn('Search has failed to load and is now disabled')
      this.setState({ enabled: false })
    }
  }

  render() {
    return this.state.enabled ? (
      <form>
        <input
          ref={ele => {
            this.input = ele
          }}
          id="algolia-doc-search"
          type="search"
          placeholder="Search docs"
          aria-label="Search docs"
        />
      </form>
    ) : null
  }
}

export default withRouter(Search)
