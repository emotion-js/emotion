import React from 'react'
import { Global, css } from '@emotion/react'
import { globalHistory } from '@reach/router'

const onlyKeepMatchedAfterSSR = mediaQuery => {
  const remove = node => node.parentNode.removeChild(node)

  const matches = window.matchMedia(mediaQuery).matches
  const prevNode = document.currentScript.previousSibling
  if (!matches) {
    removeNode(prevNode)
  }
  removeNode(document.currentScript)
}

const useMediaQuery = mediaQuery => {
  const mediaObj = React.useMemo(
    () => window.matchMedia(mediaQuery),
    [mediaQuery]
  )
  const [matches, setMatches] = React.useState(mediaObj.matches)

  React.useLayoutEffect(() => {
    const updater = () => setMatches(mediaObj.matches)
    mediaObj.addListener(updater)
    return () => mediaObj.removeListener(updater)
  }, [mediaObj])

  return matches
}

let isRefreshing = false

const CarbonStyles = () => (
  <Global
    styles={css`
      #carbonads {
        display: block;

        overflow: hidden;
      }

      #carbonads a,
      #carbonads a:hover {
        color: inherit;
        text-decoration: none;
      }

      #carbonads span {
        display: block;

        overflow: hidden;
      }

      #carbonads .carbon-img {
        display: block;

        line-height: 1;
      }

      #carbonads .carbon-img img {
        display: block;
        border: solid 1px hsla(0, 0%, 7%, 0.1);
      }

      #carbonads .carbon-text {
        display: block;
        margin-top: 0.5em;

        font-size: 14px;
        line-height: 1.35;
      }

      #carbonads .carbon-poweredby {
        display: block;
        margin-top: 0.5em;

        font-size: 10px;
        font-weight: 600;
        line-height: 1;
        letter-spacing: 0.1ch;
        text-transform: uppercase;
      }

      @media screen and (max-width: 92em) {
        #carbonads {
          position: relative;
        }

        #carbonads .carbon-wrap {
          display: flex;
          flex-direction: row;
        }

        #carbonads .carbon-text {
          padding: 0 12px;
          font-size: 16px;
        }

        #carbonads .carbon-poweredby {
          position: absolute;
          left: 142px;
          bottom: 0;
        }
      }
    `}
  />
)

export default function CarbonAds({ mediaQuery, className }) {
  if (typeof window === 'undefined') {
    return (
      <>
        <div className="carbon-wrapper" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(${onlyKeepMatched})('${mediaQuery}')`
          }}
        />
      </>
    )
  }

  const ref = React.useRef()
  const matches = useMediaQuery(mediaQuery)

  React.useLayoutEffect(() => {
    window._carbon_where = ref.current
    const carbon = window.__carbonads

    if (!carbon) {
      // carbon has not been loaded yet, once it does it will init itself
      return
    }

    if (window.__carbonReady && !isRefreshing) {
      isRefreshing = true
      carbon.refresh()
    }
  }, [matches])

  React.useLayoutEffect(() => {
    if (!matches) {
      return
    }
    globalHistory.listen(() => {
      const carbon = window.__carbonads
      if (!carbon || isRefreshing) {
        return
      }
      isRefreshing = true
      carbon.refresh()
    })
  }, [matches])

  return matches ? (
    <>
      <CarbonStyles />
      <div
        className={['carbon-wrapper', className].filter(Boolean).join(' ')}
        ref={ref}
      />
    </>
  ) : null
}
