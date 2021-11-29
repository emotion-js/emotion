import { PropsWithChildren, ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { animatedUnderline, colors, mediaQueries } from '../utils'

type HeaderLinkProps = PropsWithChildren<{ href: string; active?: boolean }>

function HeaderLink({
  href,
  active = false,
  children
}: HeaderLinkProps): ReactElement {
  // TODO:SAM active styles
  return (
    <Link href={href}>
      <a
        css={[
          {
            fontWeight: 500
          },
          animatedUnderline
        ]}
      >
        {children}
      </a>
    </Link>
  )
}

export function SiteHeader() {
  return (
    <header
      css={{
        gridColumn: '1 /span 2',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Link href="/">
        <a
          css={{
            display: 'flex',
            alignItems: 'center',
            color: colors.pink,
            textDecoration: 'none',
            marginRight: '1rem'
          }}
        >
          <Image alt="Avatar" src="logo.png" height={36} width={36} />
          <h4
            css={{
              display: 'none',
              margin: 0,
              marginLeft: '1rem',
              fontWeight: 'bold',
              [mediaQueries.lgUp]: {
                display: 'inline'
              }
            }}
          >
            Emotion
          </h4>
        </a>
      </Link>
      <nav
        css={{
          marginLeft: 'auto',
          overflowX: 'auto'
        }}
      >
        <ul
          css={{
            display: 'grid',
            gridAutoFlow: ['column dense', undefined, 'column'],
            gridColumn: ['2 / span 1', undefined, 'auto'],
            gridRow: ['1', '1', 'auto'],
            alignItems: 'center',
            justifyItems: 'center',
            gap: '1rem',
            padding: 0,
            margin: '0 0 0 auto',
            overflow: 'auto',
            listStyle: 'none',
            'li a': {
              display: 'inline-block',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              whiteSpace: 'nowrap'
            }
          }}
        >
          <li>
            <HeaderLink
              // TODO:SAM active
              href="/docs"
            >
              Docs
            </HeaderLink>
          </li>
          <li>
            <HeaderLink href="/community">Community</HeaderLink>
          </li>
          <li>
            <HeaderLink href="https://github.com/emotion-js/emotion">
              GitHub
            </HeaderLink>
          </li>
          <li>
            <HeaderLink href="https://join.slack.com/t/emotion-slack/shared_invite/zt-rmtwsy74-2uvyFdz5uxa8OiMguJJeuQ">
              Slack
            </HeaderLink>
          </li>
          <li>
            <HeaderLink href="https://5faaafd0bd0f3f0008469537--emotion.netlify.app">
              v10 Docs
            </HeaderLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
