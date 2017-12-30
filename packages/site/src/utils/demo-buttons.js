// @flow
import Box from '../components/Box'
import * as React from 'react'
import styled, { css } from 'react-emotion'
import _GatsbyLink from 'gatsby-link'
import { ErrorBoundary } from '../components/live'

export const stringCode = `const Link = styled.a\`
  display: inline-block;
  border-radius: 5px;
  padding: 16px;
  margin: 1rem 0;
  width: 12rem;
  background: \${props =>
    props.primary &&
    'linear-gradient(90deg, #D26AC2, #46C9E5)'};
  text-decoration: none;
  color: \${props =>
    props.primary ? '#1D2029' : '#D26AC2'};
  &:hover {
    opacity: 0.95;
  }
\``

export const objectCode = `const Link = styled.a(props => ({
  display: 'inline-block',
  borderRadius: 5,
  padding: 16,
  margin: '1rem 0',
  width: '12rem',
  background:
    props.primary &&
    'linear-gradient(90deg, #D26AC2, #46C9E5)',
  color: props.primary ? '#1D2029' : '#D26AC2',
  textDecoration: 'none',
  '&:hover': {
    opacity: '0.95'
  }
}))`

export const GatsbyLink = ({ primary, ...props }: *) => (
  <_GatsbyLink {...props} />
)

export const PrecompiledLink = styled(GatsbyLink)`
  display: inline-block;
  border-radius: 5px;
  padding: 16px;
  margin: 1rem 0;
  width: 12rem;
  background: ${props =>
    props.primary && 'linear-gradient(90deg, #D26AC2, #46C9E5)'};
  text-decoration: none;
  color: ${props => (props.primary ? '#1D2029' : '#D26AC2')};
  &:hover {
    opacity: 0.95;
  }
`

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
      <Link
        css={`font-weight: 800;`}
        className={textCenter}
        to="/docs/install"
        primary
      >
        Install
      </Link>
      <Link
        css={`margin-left: 20px;`}
        className={textCenter}
        to="/docs/introduction"
      >
        Getting Started
      </Link>
    </ErrorBoundary>
  </Box>
)
