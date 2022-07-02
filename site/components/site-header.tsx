import { PropsWithChildren, ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { colors, mediaQueries } from '../util'
import { css } from '@emotion/react'
import { useRouter } from 'next/dist/client/router'

export const animatedUnderline = css({
  '&::after': {
    content: '""',
    display: 'block',
    width: '100%',
    marginTop: 2,
    height: 2,
    transition: 'transform 250ms ease',
    transform: 'scaleX(0)',
    backgroundColor: colors.hightlight
  },
  '&.active::after, &:hover::after': {
    transform: 'scaleX(1)'
  }
})

type HeaderLinkProps = PropsWithChildren<{ href: string; active?: boolean }>

function HeaderLink({
  href,
  active = false,
  children
}: HeaderLinkProps): ReactElement {
  return (
    <Link href={href}>
      <a
        css={[
          {
            fontWeight: 500,
            color: colors.body,
            textDecoration: 'none'
          },
          animatedUnderline
        ]}
        className={active ? 'active' : undefined}
      >
        {children}
      </a>
    </Link>
  )
}

export function SiteHeader() {
  const router = useRouter()

  return (
    <header
      css={{
        gridColumn: '1 / span 2',
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
          <Image alt="Avatar" src="/logo.png" height={36} width={36} />
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
            gridAutoFlow: 'column', // 'column dense', undefined, 'column'],
            gridColumn: 'auto', // ['2 / span 1', undefined, 'auto'],
            gridRow: 'auto', // '1', '1', 'auto'],
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
              href="/docs/introduction"
              active={router.pathname.startsWith('/docs')}
            >
              Docs
            </HeaderLink>
          </li>
          <li>
            <HeaderLink
              href="/community"
              active={router.pathname === '/community'}
            >
              Community
            </HeaderLink>
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
