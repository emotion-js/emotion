import * as React from 'react'

export let Button = props => {
  return (
    <>
      <button
        css={{
          color: 'hotpink'
        }}
        {...props}
      />
    </>
  )
}
