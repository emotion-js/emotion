// import React from 'react'

const Greeting = ({ message }) => {
  // return <p css={{ color: 'pink' }}>{message}, world!</p>
  // the following works w/o css prop since we filter that into a passthru to react's jsx
  // TODO:  make the css prop work 🤞
  return <p>{message}, world!</p>
}

export default Greeting
