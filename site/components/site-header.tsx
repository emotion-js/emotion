import { PropsWithChildren, ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { colors, mediaQueries, styleConstants } from '../util'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import logo from '../public/logo.png'

export const animatedUnderline = css({
  '&::after': {
    content: '""',
    display: 'block',
    width: '100%',
    marginTop: 2,
    height: 3,
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
    <Link href={href} passHref>
      <a
        css={[
          {
            display: 'inline-block',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            whiteSpace: 'nowrap',
            fontWeight: 500,
            color: colors.body,
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'none'
            }
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
        backgroundColor: '#f6f6f6',
        borderBottom: `1px solid ${colors.grayBorder}`,
        boxShadow: '0 .125rem .25rem rgba(0, 0, 0, .075)',
        paddingTop: '0.25rem',
        marginBottom: '2.5rem'
      }}
    >
      <div
        css={{
          margin: '0 auto',
          maxWidth: styleConstants.containerWidth,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Link href="/docs/introduction" passHref>
          <a
            css={{
              display: 'flex',
              alignItems: 'center',
              color: colors.pink,
              textDecoration: 'none',
              marginRight: '1rem'
            }}
          >
            <Image alt="Avatar" src={logo} height={48} width={48} />
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
              display: 'flex',
              alignItems: 'center',
              justifyItems: 'center',
              gap: '1.5rem',
              padding: 0,
              margin: '0 0 0 auto',
              overflow: 'auto',
              listStyle: 'none'
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
            {/* TODO:SAM <li>
              <HeaderLink
                href="/community"
                active={router.pathname === '/community'}
              >
                Community
              </HeaderLink>
            </li> */}
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
      </div>
    </header>
  )
}
