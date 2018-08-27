// // @flow
// /**
//  * @jest-environment node
//  */
// import React from 'react'
// import createEmotion from 'create-emotion'
// import createEmotionServer from 'create-emotion-server'
// import createEmotionStyled from 'create-emotion-styled'
// import { renderToString } from 'react-dom/server'
// import { getComponents } from '../../emotion-server/test/util'

// test('multiple createEmotion calls with the same context are the same', () => {
//   const context = {}
//   const emotion1 = createEmotion(context)
//   const emotion2 = createEmotion(context)
//   const emotionServer1 = createEmotionServer(emotion1)
//   const emotionServer2 = createEmotionServer(emotion2)
//   const styled = createEmotionStyled(emotion1, React)

//   const Components = getComponents(emotion1, { default: styled })
//   const one = emotionServer1.renderStylesToString(
//     renderToString(<Components.Page1 />)
//   )
//   const two = emotionServer2.renderStylesToString(
//     renderToString(<Components.Page1 />)
//   )
//   expect(one).toEqual(two)
//   expect(one).toMatchSnapshot()
// })
