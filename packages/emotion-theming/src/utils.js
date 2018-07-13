// @flow
import PropTypes from 'prop-types'
import channel from './channel'

export const contextTypes = {
  [channel]: PropTypes.object
}

export { default as channel } from './channel'
export { default as createBroadcast } from './create-broadcast'

export type Theme = Object | ((theme?: Object) => Object)
