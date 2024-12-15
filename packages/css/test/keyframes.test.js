import 'test-utils/setup-env'
import React from 'react'
import { render } from '@testing-library/react'
import { keyframes, flush, css } from '@emotion/css'

describe('keyframes', () => {
  afterEach(() => {
    flush()
  })
  test('renders', () => {
    const bounce = keyframes`
      from, 20%, 53%, 80%, to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        transform: translate3d(0,0,0);
      }

      40%, 43% {
        animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
        transform: translate3d(0, -30px, 0);
      }

      70% {
        animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
        transform: translate3d(0, -15px, 0);
      }

      90% {
        transform: translate3d(0,-4px,0);
      }
    `

    const { container } = render(
      <h1
        className={css`
          animation: ${bounce} 2s linear infinite;
        `}
      >
        hello world
      </h1>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
  test('keyframes with interpolation', () => {
    const endingRotation = '360deg'

    const { container } = render(
      <h1
        className={css`
          animation: ${keyframes`
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(${endingRotation});
            }
          `} 2s linear infinite;
        `}
      >
        hello world
      </h1>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
