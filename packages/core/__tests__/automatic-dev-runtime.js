import { render } from '@testing-library/react'

test('basic', () => {
  const { container } = render(<div css={{ color: 'hotpink' }} />)
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="css-1lrxbo5"
      />
    </div>
  `)
})

test('static children', () => {
  const { container } = render(
    <button css={{ color: 'hotpink' }}>Emotion</button>
  )
  expect(container).toMatchInlineSnapshot(`
    <div>
      <button
        class="css-1lrxbo5"
      >
        Emotion
      </button>
    </div>
  `)
})

test('no static children', () => {
  const Button = props => {
    return <button css={{ color: 'hotpink' }} {...props} />
  }
  const { container } = render(<Button>Emotion</Button>)
  expect(container).toMatchInlineSnapshot(`
    <div>
      <button
        class="css-1q24rv0-Button"
      >
        Emotion
      </button>
    </div>
  `)
})

test('fragment', () => {
  const Test = ({ buttons }) => {
    return (
      <>
        {buttons.map(({ id, label, ...rest }) => (
          <button
            key={id}
            css={{
              color: 'hotpink'
            }}
          >
            {label}
          </button>
        ))}
      </>
    )
  }

  const { container } = render(
    <div>
      <Test buttons={[{ id: 1, label: 'Foo' }, { id: 2, label: 'Bar' }]} />
    </div>
  )

  expect(container).toMatchInlineSnapshot(`
    <div>
      <div>
        <button
          class="css-143uvrn-Test"
        >
          Foo
        </button>
        <button
          class="css-143uvrn-Test"
        >
          Bar
        </button>
      </div>
    </div>
  `)
})

test('key after spread', () => {
  const Test = ({ buttons }) => {
    return (
      <div>
        {buttons.map(({ id, label, ...rest }) => (
          <button
            {...rest}
            key={id}
            css={{
              color: 'hotpink'
            }}
          >
            {label}
          </button>
        ))}
      </div>
    )
  }

  const { container } = render(
    <Test
      buttons={[
        { id: 1, label: 'Foo', type: 'button' },
        { id: 2, label: 'Bar', type: 'button' }
      ]}
    />
  )
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div>
        <button
          class="css-143uvrn-Test"
          type="button"
        >
          Foo
        </button>
        <button
          class="css-143uvrn-Test"
          type="button"
        >
          Bar
        </button>
      </div>
    </div>
  `)
})
