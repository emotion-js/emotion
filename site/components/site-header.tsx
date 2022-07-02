import { PropsWithChildren, ReactElement } from 'react'
import Link from 'next/link'
import { colors, mediaQueries, styleConstants } from '../util'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { Container } from './container'

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
            whiteSpace: 'nowrap',
            fontWeight: 500,
            lineHeight: 1.3,
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

function UkraineBanner() {
  return (
    <a
      href="https://supportukrainenow.org"
      css={{ textDecoration: 'none', '&:hover': { textDecoration: 'none' } }}
    >
      <div
        css={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'black'
        }}
      >
        <span
          css={{
            fontWeight: 'bold',
            color: '#fff',
            fontSize: 20,

            [mediaQueries.mdUp]: {
              fontSize: 28
            }
          }}
        >
          🇺🇦 STOP WAR IN UKRAINE 🇺🇦
        </span>
      </div>
    </a>
  )
}

export function SiteHeader() {
  const router = useRouter()

  const path = router.asPath
  const onCommunityPage = path === '/docs/community'

  return (
    <>
      <UkraineBanner />
      <header
        css={{
          backgroundColor: '#f6f6f6',
          borderBottom: `1px solid ${colors.grayBorder}`,
          boxShadow: '0 .125rem .25rem rgba(0, 0, 0, .075)',
          paddingTop: '0.25rem',
          marginBottom: '1.5rem',

          [mediaQueries.mdUp]: {
            marginBottom: '2.5rem'
          }
        }}
      >
        <Container
          css={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Link href="/" passHref>
            <a
              css={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                marginRight: '1rem',
                color: colors.pink,
                '&:hover': {
                  textDecoration: 'none',
                  color: colors.hightlight
                }
              }}
            >
              {/* next/image is not compatible with `next export` */}
              <img
                alt="Avatar"
                src="/logo-48x48.png"
                srcSet="/logo-96x96.png 2x"
                height={48}
                width={48}
              />
              <h3
                css={{
                  display: 'none',
                  [mediaQueries.mdUp]: {
                    display: 'inline',
                    margin: 0,
                    marginLeft: '1.5rem',
                    fontWeight: 'bold'
                  }
                }}
              >
                Emotion
              </h3>
            </a>
          </Link>
          <nav
            css={{
              marginLeft: 'auto',
              overflowX: 'auto',

              // For proper scrollbar placement on mobile. Note, mobile scrollbars
              // are pretty different between Safari and Chrome
              padding: '0.25rem 0'
            }}
          >
            <ul
              css={{
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center',
                gap: '1.5rem',
                padding: 0,
                margin: 0,
                listStyle: 'none'
              }}
            >
              <li>
                <HeaderLink
                  href="/docs"
                  active={
                    router.pathname.startsWith('/docs') && !onCommunityPage
                  }
                >
                  Docs
                </HeaderLink>
              </li>
              <li>
                <HeaderLink href="/docs/community" active={onCommunityPage}>
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
        </Container>
      </header>
    </>
  )
}
