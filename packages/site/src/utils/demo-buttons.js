// @flow
import Box from '../components/Box'
import * as React from 'react'
import styled, { css } from 'react-emotion'
import _GatsbyLink from 'gatsby-link'
import { ErrorBoundary } from '../components/live'

export { stringCode, objectCode } from './button-src'

const Links = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem 0;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
  }
`

declare var preval: Function

export const precompiledCode = preval`module.exports =
Babel.transform(require('./button-src').stringCode, {
  plugins: [require('babel-plugin-emotion')],
  presets: ['es2015', 'stage-0', 'react']
}).code + '\\nrender(Link);'
`

export const GatsbyLink = ({ primary, ...props }: *) => (
  <_GatsbyLink {...props} />
)

const textCenter = css`
  text-align: center;
`

export const Preview = ({
  Link,
  onError
}: {
  Link: React.ComponentType<*>,
  onError: Function
}) => (
  <Box fontSize={2}>
    <ErrorBoundary onError={onError}>
      <Links>
        <Link
          css={`font-weight: 800;`}
          className={textCenter}
          to="/docs/install"
          primary
        >
          Install
        </Link>
        <Link to="/docs/introduction" className={textCenter}>
          Getting Started
        </Link>
      </Links>
    </ErrorBoundary>
  </Box>
)
