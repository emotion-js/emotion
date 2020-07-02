/** @jsx jsx */

import { jsx } from '@emotion/react'

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
