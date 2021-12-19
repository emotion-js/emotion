import { PropsWithChildren, ReactElement } from 'react'
import { DocGroup, DocMetadata } from '../queries'
import { colors } from '../util'
import { cx } from '@emotion/css'
import Link from 'next/link'

interface SidebarGroupProps {
  title: string
  docs: DocMetadata[]
  // setSidebarOpenState: boolean => void,
  // docMap: *,
  //docName?: string
}

function SidebarGroup({ title, docs }: SidebarGroupProps): ReactElement {
  return (
    <>
      <h3
        css={{
          fontWeight: 800,
          fontSize: '1.25rem',
          marginTop: '1rem',
          marginBottom: 0, // or space[1]
          lineHeight: '2rem'
        }}
        // className={cx({
        //   'docSearch-lvl0':
        //     docName !== undefined && docHeadingMap[docName] === item.title
        // })}
      >
        {title}
      </h3>
      <ul
        css={{
          listStyle: 'none',
          margin: 0,
          padding: 0
        }}
      >
        {docs.map(doc => (
          <li key={doc.slug}>
            <Link href={`/docs/${doc.slug}`}>
              <a
                css={{
                  display: 'block',
                  fontWeight: 300,
                  textDecoration: 'none',
                  margin: 0,
                  paddingTop: 6,
                  paddingBottom: 6,
                  // paddingTop: [12, 12, 6],
                  // paddingBottom: [12, 12, 6],
                  // paddingLeft: [12, 12, 0],
                  // paddingRight: [12, 12, 0],
                  '&:hover': { color: colors.border },
                  '&.active': {
                    fontWeight: 600,
                    // color: 'none', [colors.hightlight, colors.hightlight, 'none'],
                    '&::before': {
                      content: '""',
                      height: '2rem', // [42, 42, 32],
                      width: 6, // [8, 8, 6],
                      transform: `translate3d(-2rem, -0.5rem, 0)`,
                      position: 'absolute',
                      display: 'inline-block',
                      backgroundColor: colors.border // colors.lighten(0.25, colors.border)
                    }
                  }
                }}
                // activeClassName={cx('active', 'docSearch-lvl1')}
              >
                {doc.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

interface DocWrapperProps {
  docGroups: DocGroup[]

  sidebarOpen: boolean
  onSidebarOpenChange(sidebarOpen: boolean): void
}

export function DocWrapper({
  docGroups,
  sidebarOpen,
  onSidebarOpenChange,
  children
}: PropsWithChildren<DocWrapperProps>): ReactElement {
  return (
    <>
      <aside
        css={{
          /*display: [
            sidebarOpen ? 'block' : 'none',
            sidebarOpen ? 'block' : 'none',
            'block'
          ],*/
          gridColumn: '2 / span 1', // ['1 / span 2', '1 / span 2', '2 / span 1'],
          paddingLeft: '1rem', // [0, 0, space[3]],
          borderLeft: `1px solid ${colors.border}` /* [
            'none',
            'none',
            `1px solid ${colors.lighten(0.25, colors.border)}`
          ]*/
        }}
      >
        {/* <Carbon />
        <Search /> */}
        {/*docList.map(item => {
          return (
            <Match path="/docs/:docName" key={item.title}>
              {({ match }: { match?: { docName: string } }) => {
                return (
                  <SidebarGroup
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
        })*/}
        {docGroups.map(g => (
          <SidebarGroup title={g.title} docs={g.docs} key={g.title} />
        ))}
      </aside>
      <main
        css={{
          // display: [
          //   sidebarOpen ? 'none' : 'block',
          //   sidebarOpen ? 'none' : 'block',
          //   'block'
          // ],
          gridRow: 2,
          gridColumn: '1 / span 1', // ['1 / span 2', '1 / span 2', '1 / span 1'],
          paddingRight: 0
        }}
      >
        {children}
      </main>
      {/* <ToggleSidebarButton setSidebarOpen={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? (
          <CloseIcon color="white" size={32} />
        ) : (
          <MenuIcon color="white" size={32} />
        )}
      </ToggleSidebarButton> */}
    </>
  )
}
