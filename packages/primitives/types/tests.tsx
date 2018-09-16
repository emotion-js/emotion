// tslint:disable-next-line:no-implicit-dependencies
import * as React from 'react';
import styled, { flush, CreateStyledPrimitives } from '../';
import { View, Text, Image } from 'react-primitives';
import { Insets } from 'react-native';

/*
 * Inference react-primitives Props
 */
const Component1 = styled(View)({ color: 'red' });
const mountComponent1 = <Component1 hitSlop={{ top: 1 }} />;

const Component2 = styled.View`
  color: red;
`;
const mountComponent2 = <Component2 hitSlop={{ top: 1 }} />;

const Component3 = styled(View)`
  color: red;
`;
const mountComponent3 = <Component3 hitSlop={{ top: 1 }} />;

const Component4 = styled.View({ color: 'red' });
const mountComponent4 = <Component4 hitSlop={{ top: 1 }} />;

const Component5 = styled(View)({ color: 'red' });
const mountComponent5 = <Component5 hitSlop={{ top: 1 }} />;

/*
 * Passing custom props
 */
interface CustomProps {
  lookColor: string;
}

const Component6 = styled.View<CustomProps>(
  { color: 'blue' },
  props => ({
    backgroundColor: props.lookColor
  }),
  props => ({
    borderColor: props.lookColor
  })
);
const mountComponent6 = <Component6 lookColor="red" />;

const Component7 = styled(View)<CustomProps>({ color: 'blue' }, props => ({
  backgroundColor: props.lookColor
}));
const mountComponent7 = <Component7 lookColor="red" />;

const anotherColor = 'blue';
const Component8 = styled(View)`
  background: ${(props: CustomProps) => props.lookColor};
  color: ${anotherColor};
`;
const mountComponent8 = <Component8 lookColor="red" />;

/*
 * With other components
 */
interface CustomProps2 {
  customProp: string;
}
interface SFCComponentProps {
  hitSlop?: Insets;
  foo: string;
}

const SFCComponent: React.StatelessComponent<SFCComponentProps> = props => (
  <View hitSlop={props.hitSlop}>{props.children}</View>
);

declare class MyClassC extends React.Component<CustomProps2> {}

// infer SFCComponentProps
const Component9 = styled(SFCComponent)({ color: 'red' });
const mountComponent9 = <Component9 foo="bar" />;

// infer SFCComponentProps
const Component10 = styled(SFCComponent)`
  color: red;
`;
const mountComponent10 = <Component10 foo="bar" />;

const Component11 = styled(MyClassC)``;
const mountComponent11 = <Component11 customProp="abc" />;

// do not infer SFCComponentProps with pass CustomProps, need to pass both
const Component12 = styled(SFCComponent)<CustomProps2>(
  {
    color: 'red'
  },
  props => ({
    backgroundColor: props.customProp
  })
);
const mountComponent12 = <Component12 customProp="red" foo="bar" />;

// do not infer SFCComponentProps with pass CustomProps, need to pass both
const Component13 = styled(SFCComponent)`
  color: red;
  backgroundcolor: ${(props: CustomProps2) => props.customProp};
`;
const mountComponent13 = <Component13 customProp="red" foo="bar" />;

/*
 * With explicit theme
 */

interface Theme {
  color: {
    primary: string
    secondary: string
  };
}

const _styled = styled as CreateStyledPrimitives<Theme>;

const Component14 = _styled.View`
    color: ${props => props.theme.color.primary}
  `;
const mountComponent14 = <Component14 hitSlop={{ top: 1 }} />;

/*
 * withComponent
 */

interface CustomProps3 {
  bgColor: string;
}

const Component15 = styled.View<CustomProps3>(props => ({
  backgroundColor: props.bgColor
}));

const Component16 = Component15.withComponent(Text);
const mountComponent16 = <Component16 minimumFontScale={2} bgColor="red" />;

const Component17 = Component15.withComponent(Image);
const mountComponent17 = <Component17 source={{ uri: 'dummy' }} bgColor="red" />;

/*
   * Can use emotion helpers importing from react-emotion
   */

flush();

/**
 * innerRef
 */

const Component18 = styled(View)``;
const mountComponent18 = (
  <Component18 innerRef={(element: React.Ref<View>) => {}} />
);

const Component19 = styled.View``;
const mountComponent19 = (
  <Component19 innerRef={(element: React.Ref<View>) => {}} />
);

const Component20 = styled.View({});
const mountComponent20 = (
  <Component20 innerRef={(element: React.Ref<View>) => {}} />
);

const Component21 = Component18.withComponent(Image);
const mountComponent21 = (
  <Component21
    innerRef={(element: React.Ref<View>) => {}}
    source={{ uri: 'dummy' }}
  />
);
