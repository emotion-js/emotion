/** @jsx jsx */
import 'test-utils/dev-mode'
import { render, screen } from '@testing-library/react'
import { jsx } from '@emotion/react'

describe('EmotionElement', () => {
  it('only does runtime auto labels if the global flag is set', () => {
    const Comp = () => <div css={{ color: 'orchid' }} data-testid="comp" />

    const { rerender } = render(<Comp />)
    expect(screen.getByTestId('comp').className).toMatch(/^css-[^-]+$/)

    globalThis.EMOTION_RUNTIME_AUTO_LABEL = true
    rerender(<Comp />)
    expect(screen.getByTestId('comp').className).toMatch(/^css-[^-]+-Comp$/)
  })
})
