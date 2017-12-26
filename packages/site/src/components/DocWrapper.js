// @flow
import React from 'react'
import styled, { css, keyframes } from 'react-emotion'
import Link from 'gatsby-link'
import Box from './Box'
import { constants, colors } from '../utils/style'
import DocSidebar from './DocSidebar'
import { darken } from 'polished'
import MenuIcon from 'react-icons/lib/md/menu'
import { getDocMap, docList } from '../utils/misc'

const ToggleSidebarButton = styled.button`
  position: fixed;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  background-color: ${colors.pink};
  padding: 16px;
  margin: 32px;
  animation: 0.25s ease-in ${keyframes(css`
      from {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }`)};
  transition: 150ms ease-in-out background-color;
  border: 0;
  :hover,
  :focus {
    background-color: ${darken(0.15)(colors.pink)};
  }
  :active {
    background-color: ${darken(0.25)(colors.pink)};
  }
`

const linkStyles = css`
  display: block;
  text-decoration: none;
  margin: 16px;
  font-size: ${constants.fontSizes[2]}px;
  color: inherit;
`

const activeStyles = css`
  font-weight: bold;
  &::before {
    content: '';
    height: 32px;
    width: 8px;
    margin-right: 16px;
    transform: translateX(-32px) translateY(-8px);
    position: absolute;
    display: inline-block;
    background-color: hotpink;
  }
`

type Props = {
  children: React$Node,
  sidebarNodes: Array<{
    node: {
      frontmatter: {
        title: string
      },
      fields: {
        slug: string
      }
    }
  }>
}

export default (props: Props) => {
  const docMap = getDocMap(props.sidebarNodes)

  return (
    <Box flex={1}>
      <DocSidebar
        renderContent={({ docked, setSidebarOpenState }) => (
          <Box p={[3, 4]}>
            {props.children}
            {!docked && (
              <ToggleSidebarButton onClick={() => setSidebarOpenState(true)}>
                <MenuIcon color="white" size={32} />
              </ToggleSidebarButton>
            )}
          </Box>
        )}
        styles={{
          root: {
            top: 83
          },
          sidebar: {
            transitionTimingFunction: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)'
          }
        }}
        sidebarClassName={css`
          background-color: #f5f5f5;
          padding: ${constants.space[3]}px;
          width: 290px;
        `}
        renderSidebar={({ setSidebarOpenState }) =>
          docList.map(item => {
            return (
              <Box key={item.title} onClick={() => setSidebarOpenState(false)}>
                <h3>{item.title}</h3>
                {item.items.map(slug => (
                  <Link
                    className={linkStyles}
                    activeClassName={activeStyles}
                    to={`/docs/${slug}`}
                  >
                    {docMap[slug] || slug}
                  </Link>
                ))}
              </Box>
            )
          })}
      />
    </Box>
  )
}
