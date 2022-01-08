import { ReactElement, useEffect, useRef } from 'react'
import { Global, css } from '@emotion/react'
import { useRouter } from 'next/router'

const carbonCss = css`
  #carbonads {
    display: block;

    overflow: hidden;
    margin-bottom: 2rem;
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

  @media only screen and (min-width: 320px) and (max-width: 759px) {
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
`

export function CarbonAds(): ReactElement {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const script = document.createElement('script')
    script.async = true
    script.id = '_carbonads_js' // This ID is required for the Carbon JS to work
    script.src =
      'https://cdn.carbonads.com/carbon.js?serve=CESDV5QY&placement=emotionsh'

    ref.current.appendChild(script)
  }, [])

  const router = useRouter()

  // Change the ad when the user navigates to a different doc
  useEffect(() => {
    const _global = globalThis as { _carbonads?: { refresh(): void } }

    _global._carbonads?.refresh()
  }, [router.asPath])

  return (
    <>
      <Global styles={carbonCss} />
      <div ref={ref} />
    </>
  )
}
