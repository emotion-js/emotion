import { renderToString } from 'react-dom/server'
import { renderStylesToString } from 'emotion-server'

exports.replaceRenderer = ({ replaceBodyHTMLString, bodyComponent }) => {
  return replaceBodyHTMLString(
    renderStylesToString(renderToString(bodyComponent))
  )
}
