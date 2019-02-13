// @flow
import * as React from 'react'
import { css, keyframes, cx } from 'emotion'
import { Link } from 'gatsby'
import Box from './Box'
import { constants, colors, p, mq } from '../utils/style'
import DocSidebar from './DocSidebar'
import darken from 'polished/lib/color/darken'
import MenuIcon from 'react-icons/lib/md/menu'
import { getDocMap, docList } from '../utils/misc'

import { Match } from '@reach/router'

import DocMetadata from './DocMetadata'

const scaleAnimation = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`

function ToggleSidebarButton({ setSidebarOpen, ...rest }) {
  return (
    <button
      css={{
        position: 'fixed',
        bottom: '0',
        right: '0',
        borderRadius: '50%',
        backgroundColor: 'pink',
        padding: '16px',
        margin: '32px',
        animation: `0.25s ease-in ${scaleAnimation}`,
        transition: '150ms ease-in-out background-color',
        border: '0',
        '&:hover,&:focus': {
          backgroundColor: darken(0.15)(colors.pink)
        },
        '&:active': {
          backgroundColor: darken(0.25)(colors.pink)
        }
      }}
      onClick={() => setSidebarOpen(true)}
      {...rest}
    />
  )
}

const pageLinkStyles = css(
  { marginLeft: 8 },
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

const SidebarGroup = (props: {
  item: { title: string, items: Array<string> },
  setSidebarOpenState: boolean => void,
  docMap: *,
  docName?: string,
  index: number
}) => {
  const { index, item, docMap, docName } = props
  console.log(index)
  return (
    <>
      <h3
        css={mq({
          fontWeight: 800,
          fontSize: [
            constants.fontSizes[5],
            constants.fontSizes[5],
            constants.fontSizes[3]
          ],
          color: colors.color,
          marginTop:
            index === 0 ? 0 : [constants.space[3], constants.space[3], 0],
          marginBottom: 0,
          lineHeight: '32px'
        })}
        className={cx({
          'docSearch-lvl0':
            docName !== undefined && docHeadingMap[docName] === item.title
        })}
      >
        {item.title}
      </h3>
      {item.items.map(slug => (
        <Link
          key={slug}
          css={mq({
            display: 'block',
            fontSize: [
              constants.fontSizes[4],
              constants.fontSizes[4],
              constants.fontSizes[2]
            ],
            fontWeight: '300',
            color: colors.color,
            textDecoration: 'none',
            marginTop: [24, 24, 12],
            marginBottom: [24, 24, 12],
            '&:hover': { color: colors.border },
            '&.active': {
              fontWeight: 600,
              '&::before': {
                content: '""',
                height: 32,
                width: 8,
                transform: `translate3d(-${constants.space[3]}px, -${
                  constants.space[1]
                }px, 0)`,
                position: 'absolute',
                display: 'inline-block',
                backgroundColor: colors.hightlight
              }
            }
          })}
          activeClassName={cx('active', 'docSearch-lvl1')}
          to={`/docs/${slug}`}
        >
          {docMap[slug] || slug}
        </Link>
      ))}
    </>
  )
}

export default ({ children, sidebarOpen, setSidebarOpen }) => {
  return (
    <DocMetadata
      render={data => {
        const docMap = getDocMap(data)

        return (
          <>
            <div
              css={{
                display: sidebarOpen ? 'flex' : 'none',
                gridRow: '1 / span 2',
                gridColumn: '1 / span 2'
              }}
            >
              <button
                onClick={() => setSidebarOpen(false)}
                css={{
                  marginLeft: 'auto',
                  position: 'relative',
                  borderRadius: 4,
                  height: 48,
                  width: 48,
                  '&:after': {
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    content: `"X"`,
                    fontSize: constants.space[3],
                    color: colors.color,
                    lineHeight: '48px',
                    textAlign: 'center'
                  }
                }}
              />
            </div>
            <div
              css={mq({
                display: [
                  sidebarOpen ? 'block' : 'none',
                  sidebarOpen ? 'block' : 'none',
                  'block'
                ],
                gridRow: '2',
                gridColumn: '1 / span 2',
                borderRight: [
                  'none',
                  'none',
                  `1px solid ${colors.lighten(0.25, colors.border)}`
                ]
              })}
            >
              {docList.map((item, index) => {
                return (
                  <Match path="/docs/:docName" key={item.title}>
                    {({ match }: { match?: { docName: string } }) => {
                      return (
                        <SidebarGroup
                          index={index}
                          item={item}
                          sidebarOpen={sidebarOpen}
                          setSidebarOpenState={setSidebarOpen}
                          docMap={docMap}
                          docName={match && match.docName}
                        />
                      )
                    }}
                  </Match>
                )
              })}
            </div>
            <div
              css={mq({
                display: [
                  sidebarOpen ? 'none' : 'block',
                  sidebarOpen ? 'none' : 'block',
                  'block'
                ],
                gridColumn: '1 / span 2',
                paddingRight: [0, 0, 0]
              })}
            >
              {children}
            </div>
            {!sidebarOpen && (
              <ToggleSidebarButton setSidebarOpen={setSidebarOpen}>
                <MenuIcon color="white" size={32} />
              </ToggleSidebarButton>
            )}
          </>
        )
      }}
    />
  )
}
