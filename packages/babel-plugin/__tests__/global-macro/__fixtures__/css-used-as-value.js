import * as React from 'react'
import { Global, css } from '@emotion/react/macro'

// this gets ignored by Global macro, but it tests that this combination doesn't crash or something
export default () => <Global styles={css({ color: 'hotpink' })} />
