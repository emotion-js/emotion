// @flow
import React from 'react'
import styled, { css, keyframes, cx } from 'react-emotion'
import Link from 'gatsby-link'
import Box from './Box'
import { constants, colors, p } from '../utils/style'
import DocSidebar from './DocSidebar'
import darken from 'polished/lib/color/darken'
import MenuIcon from 'react-icons/lib/md/menu'
import { getDocMap, docList } from '../utils/misc'

import type { Match } from '../utils/types'
import { Route, Switch } from 'react-router'

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

const pageLinkStyles = css(
  p({
    color: [
      colors.pink,
      colors.darken1(colors.pink),
      colors.darken2(colors.pink),
      colors.darken3(colors.pink)
    ]
  })
)

const flatDocList = docList.reduce(
  (arr, current) => arr.concat(current.items),
  []
)

const docHeadingMap = docList.reduce((obj, current) => {
  current.items.forEach(item => {
    obj[item] = current.title
  })
  return obj
}, {})

const renderSidebar = (
  item: { title: string, items: Array<string> },
  setSidebarOpenState: boolean => void,
  docMap: *,
  docName?: string
) => {
  return (
    <Box onClick={() => setSidebarOpenState(false)}>
      <h3
        className={
          docName !== undefined &&
          cx({
            'docSearch-lvl0': docHeadingMap[docName] === item.title
          })
        }
      >
        {item.title}
      </h3>
      {item.items.map(slug => (
        <Link
          key={slug}
          className={linkStyles}
          activeClassName={cx(activeStyles, 'docSearch-lvl1')}
          to={`/docs/${slug}`}
        >
          {docMap[slug] || slug}
        </Link>
      ))}
    </Box>
  )
}

export default (props: Props) => {
  const docMap = getDocMap(props.sidebarNodes)
  return (
    <Box flex={1}>
      <DocSidebar
        renderOutside={({ docked, setSidebarOpenState }) =>
          !docked && (
            <ToggleSidebarButton onClick={() => setSidebarOpenState(true)}>
              <MenuIcon color="white" size={32} />
            </ToggleSidebarButton>
          )}
        renderContent={({ docked, setSidebarOpenState }) => (
          <Box p={[3, 4]}>
            {props.children}
            <Route
              path="/docs/:doc"
              render={({ match }: { match: Match }) => {
                const index = flatDocList.findIndex(
                  item => item === match.params.doc
                )
                const hasNextDoc = index !== flatDocList.length - 1
                const hasPrevDoc = index !== 0
                const containerFontSize = [3, 4]
                const linkFontSize = [5, 6]
                return (
                  <Box
                    display="flex"
                    pt={2}
                    direction={['column', 'row']}
                    justify="space-between"
                  >
                    {hasPrevDoc ? (
                      <Box fontSize={containerFontSize}>
                        Previous Page
                        <Box fontSize={linkFontSize}>
                          <Link
                            className={pageLinkStyles}
                            to={`/docs/${flatDocList[index - 1]}`}
                          >
                            {docMap[flatDocList[index - 1]] ||
                              flatDocList[index - 1]}
                          </Link>
                        </Box>
                      </Box>
                    ) : (
                      <Box />
                    )}
                    {hasNextDoc ? (
                      <Box pt={[3, 0]} fontSize={containerFontSize}>
                        Next Page
                        <Box fontSize={linkFontSize}>
                          <Link
                            className={pageLinkStyles}
                            to={`/docs/${flatDocList[index + 1]}`}
                          >
                            {docMap[flatDocList[index + 1]] ||
                              flatDocList[index + 1]}
                          </Link>
                        </Box>
                      </Box>
                    ) : (
                      <Box />
                    )}
                  </Box>
                )
              }}
            />
            <Box p={[4, 1]} />
          </Box>
        )}
        styles={{
          root: {
            top: 83
          },
          sidebar: {
            transitionTimingFunction: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)'
          },
          content: {
            transition: 'none'
          }
        }}
        sidebarClassName={css`
          background-color: #f5f5f5;
          padding: ${constants.space[3]}px;
          width: 290px;
        `}
        contentClassName={css`
          transform: translateZ(0px);
        `}
        renderSidebar={({ setSidebarOpenState }) =>
          docList.map(item => {
            return (
              <Switch>
                <Route
                  path="/docs/:docName"
                  key={item.title}
                  render={({ match }) => {
                    const { docName } = match.params
                    return renderSidebar(
                      item,
                      setSidebarOpenState,
                      docMap,
                      docName
                    )
                  }}
                />
                <Route
                  exact
                  path="/docs"
                  key={item.title}
                  render={() => {
                    return renderSidebar(item, setSidebarOpenState, docMap)
                  }}
                />
              </Switch>
            )
          })}
      />
    </Box>
  )
}
