import * as React from 'react'
import styled from '@emotion/styled-base'

// tslint:disable-next-line: interface-over-type-literal
type ReactClassProps0 = {
  readonly column: boolean
}
declare class ReactClassComponent0 extends React.Component<ReactClassProps0> {}

interface ReactClassProps1 {
  readonly value: string
}
declare class ReactClassComponent1 extends React.Component<ReactClassProps1> {}

interface ReactClassProps2 {
  readonly column: number
}
declare class ReactClassComponent2 extends React.Component<ReactClassProps2> {}

// tslint:disable-next-line: interface-over-type-literal
type ReactSFCProps0 = {
  readonly column: boolean
}
declare const ReactSFC0: React.SFC<ReactSFCProps0>

interface ReactSFCProps1 {
  readonly value: string
}
declare const ReactSFC1: React.SFC<ReactSFCProps1>

interface ReactSFCProps2 {
  readonly value: number
}
declare const ReactSFC2: React.SFC<ReactSFCProps2>

const Button0 = styled('button')`
  color: blue;
`
const Button1 = styled('button')({
  color: 'blue'
})
;<div>
  <Button0 />
  <Button0 type="button" />
</div>
;<div>
  <Button1 />
  <Button1 type="button" />
</div>

const Input0 = styled('input', {
  label: 'mystyle'
})`
  padding: 4px;
`
const Input1 = styled('input', {
  label: 'mystyle'
})({
  padding: '4px'
})
;<Input0 />
;<Input1 />
const Input2 = Button0.withComponent('input')

const Canvas0 = styled('canvas', {
  shouldForwardProp(propName) {
    return propName === 'width' || propName === 'height'
  }
})`
  width: 200px;
`
const Canvas1 = styled('canvas', {
  shouldForwardProp(propName) {
    return propName === 'width' || propName === 'height'
  }
})({
  width: '200px'
})
;<Canvas0 />
;<Canvas1 />

interface PrimaryProps {
  readonly primary: string
}
/**
 * @desc
 * This function accepts `InnerProps`/`Tag` to infer the type of `tag`,
 * and accepts `ExtraProps` for user who use string style
 * to be able to declare extra props without using
 * `` styled('button')<ExtraProps>`...` ``, which does not supported in
 * styled-component VSCode extension.
 * If your tool support syntax highlighting for `` styled('button')<ExtraProps>`...` ``
 * it could be more efficient.
 */
const Button2 = styled<'button', PrimaryProps>('button')`
  fontsize: ${5}px;
  color: ${props => props.primary};
`
const Button3 = styled<'button', PrimaryProps>('button')(props => ({
  color: props.primary
}))
;<div>
  <Button2 primary="blue" />
  <Button2 primary="blue" type="button" />
</div>
;<div>
  <Button3 primary="blue" />
  <Button3 primary="blue" type="button" />
</div>
// $ExpectError
;<Button2 />
// $ExpectError
;<Button2 type="button" />
// $ExpectError
;<Button3 />
// $ExpectError
;<Button3 type="button" />

const Button4 = styled<ReactClassProps0, PrimaryProps>(ReactClassComponent0)`
  backgroundColor: ${props => props.theme.backColor}

  fontSize: ${5}px;
  color: ${props => props.primary}
`
const Button5 = styled<ReactSFCProps0, PrimaryProps>(ReactSFC0)(props => ({
  color: props.primary
}))
;<div>
  <Button4 column={true} primary="blue" />
  <Button4 column={false} primary="blue" />
</div>
;<div>
  <Button5 column={true} primary="blue" />
  <Button5 column={false} primary="blue" />
</div>
// $ExpectError
;<Button4 />
// $ExpectError
;<Button4 colume={true} />
// $ExpectError
;<Button5 />
// $ExpectError
;<Button5 colume={true} />

const Container0 = styled(ReactClassComponent0)`
  display: flex;
  flexdirection: ${props => props.column && 'column'};
`
;<Container0 column={false} />
// $ExpectError
;<Container0 />

const Container1 = Container0.withComponent('span')
;<Container1 column={true} />
;<Container1 column={true} onClick={undefined as any} />
// $ExpectError
;<Container1 contentEditable />

const Container2 = Container0.withComponent(ReactSFC0)
;<Container2 column={true} />
// $ExpectError
;<Container2 />

const Container3 = Container0.withComponent<ReactClassProps1>(
  ReactClassComponent1
)
;<Container3 column={false} value="123" />
// $ExpectError
;<Container3 colume={true} />
// $ExpectError
;<Container3 value="5" />

interface ContainerProps {
  extraWidth: string
}
const Container4 = styled(ReactSFC2)<ContainerProps>(props => ({
  borderColor: 'black',
  borderWidth: props.extraWidth,
  borderStyle: 'solid'
}))
;<Container4 extraWidth="20px" value={123} />
// $ExpectError
;<Container4 />
// $ExpectError
;<Container4 value="5" />

const Container5 = Container3.withComponent<ReactSFCProps2>(ReactSFC2)
;<Container5 column={true} value={123} />
// $ExpectError
;<Container5 />
// $ExpectError
;<Container5 column={true} />
// $ExpectError
;<Container5 value={242} />

// $ExpectError
styled(ReactSFC2)<ReactSFCProps1>()
// $ExpectError
Container0.withComponent(ReactClassComponent2)
// $ExpectError
Container3.withComponent(ReactClassComponent2)
