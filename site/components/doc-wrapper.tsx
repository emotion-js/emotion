import Link from 'next/link'
import { PropsWithChildren, ReactElement, useState } from 'react'
import { DocGroup, DocMetadata } from '../queries'
import { colors } from '../util'
import { CarbonAds } from './carbon-ads'
import { markdownCss } from './markdown-css'
import { Search } from './search'

interface SidebarGroupProps {
  activeSlug: string
  title: string
  docs: DocMetadata[]
}

function SidebarGroup({
  activeSlug,
  title,
  docs
}: SidebarGroupProps): ReactElement {
  return (
    <>
      <h3
        css={{
          fontWeight: 'bold',
          fontSize: '1.25rem',
          marginBottom: 6
        }}
      >
        {title}
      </h3>
      <ul
        css={{
          listStyle: 'none',
          margin: 0,
          marginBottom: '1.5rem',
          padding: 0
        }}
      >
        {docs
          .filter(doc => doc.slug !== 'community')
          .map(doc => (
            <li key={doc.slug}>
              <Link href={`/docs/${doc.slug}`} passHref>
                <a
                  css={{
                    display: 'block',
                    paddingTop: 6,
                    paddingBottom: 6,
                    color: colors.body,
                    '&:hover': {
                      color: colors.pink,
                      textDecoration: 'none'
                    },
                    '&.active': {
                      fontWeight: 600,
                      color: colors.hightlight,
                      '&::before': {
                        content: '""',
                        height: '2rem',
                        width: '0.5rem',
                        transform: `translate(-2rem, -0.25rem)`,
                        position: 'absolute',
                        display: 'inline-block',
                        backgroundColor: colors.pinkBorder
                      }
                    }
                  }}
                  className={activeSlug === doc.slug ? 'active' : undefined}
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
  activeSlug: string
  docGroups: DocGroup[]
}

export function DocWrapper({
  activeSlug,
  docGroups,
  children
}: PropsWithChildren<DocWrapperProps>): ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div css={{ display: 'flex' }}>
      <main
        css={[
          markdownCss,
          {
            paddingRight: '2rem',
            flex: 1
          }
        ]}
      >
        {children}
      </main>
      <aside
        css={{
          flexShrink: 0,
          width: 220,
          paddingLeft: '2rem', // [0, 0, space[3]],
          borderLeft: `1px solid ${colors.pinkBorder}` /* [
            'none',
            'none',
            `1px solid ${colors.lighten(0.25, colors.border)}`
          ]*/
        }}
      >
        <CarbonAds />
        <Search />
        {docGroups.map(g => (
          <SidebarGroup
            activeSlug={activeSlug}
            title={g.title}
            docs={g.docs}
            key={g.title}
          />
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
