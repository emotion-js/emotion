import React from 'react'
import { Global, css } from '@emotion/react'

function buildScript(src, attrs = {}) {
  const script = document.createElement('script')
  script.async = true
  Object.keys(attrs).forEach(attr => script.setAttribute(attr, attrs[attr]))
  script.src = src

  return script
}

export default function CarbonAds() {
  const ref = React.useRef()

  React.useEffect(() => {
    const script = buildScript(
      '//cdn.carbonads.com/carbon.js?serve=CESDV5QY&placement=emotionsh',
      {
        type: 'text/javascript',
        id: '_carbonads_js'
      }
    )

    ref.current.appendChild(script)
  }, [])

  return (
    <>
      <Global
        styles={css`
          #carbonads {
            display: block;

            overflow: hidden;
            margin-bottom: 2em;
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
        `}
      />
      <div ref={ref} />
    </>
  )
}
