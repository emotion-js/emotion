// tslint:disable-next-line:no-implicit-dependencies
import * as Preact from 'preact';
import styled, { flush, CreateStyled } from '../';

const h = Preact.h;

let Component;
let mount;

/*
 * Inference HTML Tag Props
 */
const Component0 = styled.div({ color: 'red' });
mount = <Component0 onClick={(event: any) => event} />;

Component = styled('div')({ color: 'red' });
mount = <Component onClick={(event: any) => event} />;

Component = styled.div`color: red;`;
mount = <Component onClick={(event: any) => event} />;

Component = styled('div')`color: red;`;
mount = <Component onClick={(event: any) => event} />;

Component = styled.a({ color: 'red' });
mount = <Component href="#" />;

Component = styled('a')({ color: 'red' });
mount = <Component href="#" />;

/*
 * Passing custom props
 */
interface CustomProps { lookColor: string; }

Component = styled.div<CustomProps>(
  { color: 'blue' },
  props => ({
    background: props.lookColor,
  }),
  props => ({
    border: `1px solid ${props.lookColor}`,
  }),
);
mount = <Component lookColor="red" />;

Component = styled('div')<CustomProps>(
  { color: 'blue' },
  props => ({
    background: props.lookColor,
  }),
);
mount = <Component lookColor="red" />;

const anotherColor = 'blue';
Component = styled('div')`
  background: ${(props: CustomProps) => props.lookColor};
  color: ${anotherColor};
`;
mount = <Component lookColor="red" />;

/*
 * With other components
 */
interface CustomProps2 { customProp: string; }
interface SFCComponentProps { className?: string; foo: string; }

const SFCComponent: Preact.FunctionalComponent<SFCComponentProps> = props => (
  <div className={props.className}>{props.children} {props.foo}</div>
);

declare class MyClassC extends Preact.Component<CustomProps2> {
  render(): JSX.Element;
}

// infer SFCComponentProps
Component = styled(SFCComponent)({ color: 'red' });
mount = <Component foo="bar" />;

// infer SFCComponentProps
Component = styled(SFCComponent)`color: red`;
mount = <Component foo="bar" />;

Component = styled(MyClassC)``;
mount = <Component customProp="abc" />;

// do not infer SFCComponentProps with pass CustomProps, need to pass both
Component = styled(SFCComponent)<CustomProps2>({
  color: 'red',
}, props => ({
  background: props.customProp,
}));
mount = <Component customProp="red" foo="bar" />;

// do not infer SFCComponentProps with pass CustomProps, need to pass both
Component = styled(SFCComponent)`
  color: red;
  background: ${(props: CustomProps2) => props.customProp};
`;
mount = <Component customProp="red" foo="bar" />;

/*
 * With explicit theme
 */

interface Theme {
  color: {
    primary: string;
    secondary: string;
  };
}

const _styled = styled as CreateStyled<Theme>;

Component = _styled.div`
  color: ${props => props.theme.color.primary}
`;
mount = <Component onClick={(event: any) => event} />;

/*
 * withComponent
 */

interface CustomProps3 {
  bgColor: string;
}

Component = styled.div<CustomProps3>(props => ({
  bgColor: props.bgColor,
}));

const Link = Component.withComponent('a');
mount = <Link href="#" bgColor="red" />;

const Button = Component.withComponent('button');
mount = <Button type="submit" bgColor="red" />;

/*
 * Can use emotion helpers importing from react-emotion
 */

flush();

/**
 * innerRef
 */

Component = styled('div')``;
mount = <Component innerRef={(element: HTMLDivElement) => {}} />;

Component = styled.div``;
mount = <Component innerRef={(element: HTMLDivElement) => {}} />;

Component = styled.div({});
mount = <Component innerRef={(element: HTMLDivElement) => {}} />;

Component = Component.withComponent('input');
mount = <Component innerRef={(element: HTMLInputElement) => {}} />;

/**
 * css prop
 */
Component = styled.div({ color: 'red' });
mount = <Component css={{color: 'blue'}} />;
mount = (
  <Component css={`
    color: blue;
  `}
  />
);
mount = <div css={{ color: 'blue' }} />;
mount = (
  <div css={`
    color: blue;
    `}
  />
);

/*
 * Reference to other styled component
 */
const Child = styled.div`
  color: red;
`;

const Parent = styled.div`
  ${Child} {
    color: blue;
  }
`;

interface TestComponentFactoryProps {
  value: number;
}

declare const TestComponentFactory: Preact.ComponentFactory<TestComponentFactoryProps>;

const StyledComponentFactory0 = styled(TestComponentFactory)({
  color: 'red',
});

const StyledComponentFactory1 = styled(TestComponentFactory)`
  color: red;
`;

const ComposingCompFactory = styled.div`
  ${StyledComponentFactory1} {
    background-color: green;
  }
`;

<StyledComponentFactory0 value={5} />;
<StyledComponentFactory1 value={4} />;
<ComposingCompFactory />;
