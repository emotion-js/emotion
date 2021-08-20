import React from 'react'
import '../css/carbon.css'

function buildScript(src, attrs = {}) {
  if (typeof document !== 'undefined') {
    const script = document.createElement('script')
    script.async = true
    script.defer = true
    Object.keys(attrs).forEach(attr => script.setAttribute(attr, attrs[attr]))
    script.src = src

    return script
  }
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

  return <div className="sidebar-sponsor" ref={ref} />
}
