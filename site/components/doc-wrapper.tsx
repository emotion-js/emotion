import { PropsWithChildren, ReactElement, useState } from 'react'
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
          fontWeight: 'bold',
          fontSize: '1.25rem',
          marginBottom: 6
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
          marginBottom: '1rem',
          padding: 0
        }}
      >
        {docs.map(doc => (
          <li key={doc.slug}>
            <Link href={`/docs/${doc.slug}`} passHref>
              <a
                css={{
                  display: 'block',
                  paddingTop: 6,
                  paddingBottom: 6,
                  color: colors.body,
                  '&:hover': {
                    color: colors.pink
                  },
                  '&.active': {
                    fontWeight: 600,
                    color: colors.hightlight,
                    '&::before': {
                      content: '""',
                      height: '2rem',
                      width: '0.5rem',
                      transform: `translate3d(-2rem, -0.5rem, 0)`,
                      position: 'absolute',
                      display: 'inline-block',
                      backgroundColor: colors.border
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
}

export function DocWrapper({
  docGroups,
  children
}: PropsWithChildren<DocWrapperProps>): ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div css={{ display: 'flex' }}>
      <main
        css={{
          paddingRight: '1rem'
        }}
      >
        {children}
      </main>
      <aside
        css={{
          flexShrink: 0,
          width: 220,
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
        {docGroups.map(g => (
          <SidebarGroup title={g.title} docs={g.docs} key={g.title} />
        ))}
      </aside>
      {/* <ToggleSidebarButton setSidebarOpen={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? (
          <CloseIcon color="white" size={32} />
        ) : (
          <MenuIcon color="white" size={32} />
        )}
      </ToggleSidebarButton> */}
    </div>
  )
}
