/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { render } from '@testing-library/react'

test('Transfer Component.defaultProps', () => {
  let ParentComp = props => {
    let childProps = props.children.props
    return <div className="parent">{childProps.defaultPropsParam}</div>
  }
  let ChildComp = () => <div>Child</div>

  ChildComp.defaultProps = {
    defaultPropsParam: 'i will show in parent component'
  }

  let { container } = render(
    <ParentComp>
      <ChildComp
        css={css`
          color: red;
        `}
      />
    </ParentComp>
  )
  expect(container).toMatchSnapshot()
})

test('Transfer Component.defaultProps and override by Component.Props', () => {
  let ParentComp = props => {
    let childProps = props.children.props
    return <div className="parent">{childProps.defaultPropsParam}</div>
  }
  let ChildComp = () => <div>Child</div>

  ChildComp.defaultProps = {
    defaultPropsParam: 'i will show in parent component'
  }

  let { container } = render(
    <ParentComp>
      <ChildComp
        defaultPropsParam={'orrivide defaultProps value'}
        css={css`
          color: blue;
        `}
      />
    </ParentComp>
  )
  expect(container).toMatchSnapshot()
})

test('Transfer Component.defaultProps to easy make judgement', () => {
  let ParentComp = props => {
    let childProps = props.children.props
    return (
      <div className="parent">
        {childProps.defaultPropsParam ? <div>make some judgments</div> : null}
      </div>
    )
  }
  let ChildComp = () => <div>Child</div>

  ChildComp.defaultProps = {
    defaultPropsParam: true
  }

  let { container } = render(
    <ParentComp>
      <ChildComp
        css={css`
          color: white;
        `}
      />
    </ParentComp>
  )
  expect(container).toMatchSnapshot()
})
