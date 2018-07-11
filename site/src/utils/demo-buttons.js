// @flow
import Box from '../components/Box'
import * as React from 'react'
import styled from '@emotion/styled'
import css from '@emotion/css'
import _GatsbyLink from 'gatsby-link'
import { ErrorBoundary } from '../components/live'

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
          css={css`
            font-weight: 800;
            ${textCenter};
          `}
          to="/docs/install"
          primary
        >
          Install
        </Link>
        <Link to="/docs/introduction" css={textCenter}>
          Getting Started
        </Link>
      </Links>
    </ErrorBoundary>
  </Box>
)
