/** @jsx jsx */

import { jsx } from '@emotion/core'

const SomeComponent = props => {
  return (
    <div
      css={{
        color: 'green',
        ':hover': {
          color: 'hotpink'
        }
      }}
      {...props}
    />
  )
}
