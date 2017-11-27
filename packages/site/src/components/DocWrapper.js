// @flow
import React from 'react'
import styled, { css, keyframes } from 'react-emotion'
import Link from 'gatsby-link'
import Box from './Box'
import { constants, colors } from '../utils/style'
import DocSidebar from './DocSidebar'
import { darken } from 'polished'
import MenuIcon from 'react-icons/lib/md/menu'

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

const Children = ({ children }: { children: React$Node }) => children

type Props = {
  children: React$Node,
  sidebarNodes: Array<{
    node: {
      name: string,
      childMarkdownRemark: { frontmatter: { title?: string } }
    }
  }>
}

export default (props: Props) => (
  <Box flex={1}>
    <DocSidebar
      renderContent={({ docked, setSidebarOpenState }) => (
        <Children>
          <Box p={4}>
            {props.children}
            {!docked && (
              <ToggleSidebarButton onClick={() => setSidebarOpenState(true)}>
                <MenuIcon color="white" size={32} />
              </ToggleSidebarButton>
            )}
          </Box>
        </Children>
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
      `}
      renderSidebar={({ setSidebarOpenState }) =>
        props.sidebarNodes.map(({ node }) => {
          return (
            <Box key={node.name} onClick={() => setSidebarOpenState(false)}>
              <Link
                className={css`
              display: block;
              text-decoration: none;
              margin: 16px;
              font-size: ${constants.fontSizes[2]}px
              color: inherit;
            `}
                activeClassName={css`
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
                `}
                to={`/docs/${node.name}`}
              >
                {node.childMarkdownRemark.frontmatter.title || node.name}
              </Link>
            </Box>
          )
        })}
    />
  </Box>
)
