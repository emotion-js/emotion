// @flow
import Box from '../components/Box'
import * as React from 'react'
import styled, { css } from 'react-emotion'
import _GatsbyLink from 'gatsby-link'
import { ErrorBoundary } from '../components/live'

const stringLinks = `
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin: 1rem 0;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
  }
`

const stringLink = `
  box-sizing: border-box;
  overflow: hidden;

  min-width: 12rem;
  margin: 0 auto 20px;
  padding: 16px;
  border-radius: 5px;
  text-decoration: none;
  border: \${props => props.primary ? 'none' : '3px solid currentColor'};
  background: \${props => props.primary && 'linear-gradient(90deg, #D26AC2, #46C9E5)'};
  color: \${props => props.primary ? '#1D2029' : '#D26AC2'};

  &:hover {
    opacity: 0.95;
  }

  @media (min-width: 768px) {
    margin: 0 20px 0 0;

    &:last-child {
      margin: 0;
    }
  }
`

export const stringCode = `
const Links = styled.div\`${stringLinks}\`

const Link = styled.a\`${stringLink}\`
`

export const objectCode = `
const Links = styled.div(props => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  margin: '1rem 0',

  '@media (min-width: 768px)': {
    flexDirection: row,
    justifyContent: flex-start
  }
}))

const Link = styled.a(props => ({
  boxSizing: 'border-box',
  overflow: 'hidden',
  borderRadius: 5,
  padding: 16,
  margin: '1rem 0',
  width: '12rem',
  border: props.primary ? 'none' : '3px solid currentColor',
  background: props.primary && 'linear-gradient(90deg, #D26AC2, #46C9E5)',
  color: props.primary ? '#1D2029' : '#D26AC2',
  textDecoration: 'none',
  '&:hover': {
    opacity: '0.95'
  },
  '@media (min-width: 768px)': {
    margin: '0 20px 0 0',

    '&:last-child': {
      margin: 0
    }
  }
}))`

export const GatsbyLink = ({ primary, ...props }: *) => (
  <_GatsbyLink {...props} />
)

export const PrecompiledLinks = styled.div`
  ${stringLinks};
`

export const PrecompiledLink = styled(GatsbyLink)`
  ${stringLink};
`

const textCenter = css`
  text-align: center;
`

export const Preview = ({
  Links,
  Link,
  onError
}: {
  Links: React.ComponentType<*>,
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
