import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PropsWithChildren, ReactElement, useEffect, useState } from 'react'
import { DocGroup, DocMetadata } from '../queries'
import { colors, mediaQueries } from '../util'
import { CarbonAds } from './carbon-ads'
import { markdownCss } from './markdown-css'
import { Search } from './search'

interface ToggleSidebarButtonProps {
  sidebarOpen: boolean
  onClick(): void
}

function ToggleSidebarButton({
  sidebarOpen,
  onClick
}: ToggleSidebarButtonProps) {
  return (
    <button
      css={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        borderRadius: '50%',
        backgroundColor: colors.hightlight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.1rem',
        margin: '2rem',
        width: '3.5rem',
        height: '3.5rem',
        lineHeight: 1,
        transition: '150ms ease-in-out background-color',
        border: 'none',
        color: 'white',
        zIndex: 500,

        svg: {
          // Necessary for Safari
          width: '100%'
        },

        [mediaQueries.mdUp]: {
          display: 'none'
        }
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
    </button>
  )
}

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

  const path = useRouter().asPath

  // Close sidebar when path changes
  useEffect(() => {
    setSidebarOpen(false)
  }, [path])

  return (
    <>
      <div css={{ display: 'flex' }}>
        <main
          css={[
            markdownCss,
            {
              display: sidebarOpen ? 'none' : 'block',

              // This is necessary to prevent code blocks from overflowing on
              // mobile
              overflow: 'hidden',

              [mediaQueries.mdUp]: {
                display: 'block',
                flex: 1
              }
            }
          ]}
        >
          {children}
        </main>
        <aside
          css={{
            flexGrow: 1,
            display: sidebarOpen ? 'block' : 'none',

            [mediaQueries.mdUp]: {
              flexGrow: 0,
              flexShrink: 0,
              width: 180,
              display: 'block',
              marginLeft: '2rem',
              paddingLeft: '2rem',
              borderLeft: `1px solid ${colors.pinkBorder}`
            },

            [mediaQueries.lgUp]: {
              width: 220
            }
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
      </div>
      <ToggleSidebarButton
        sidebarOpen={sidebarOpen}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      />
    </>
  )
}
