import createEmotion from 'create-emotion';
import React from 'react';

import createEmotionStyled, { StyledComponent } from '../';

const context = {
  name: 'emotion',
};

const createStyled = createEmotionStyled(createEmotion(context), React);

interface TestClassProps {
  readonly some: number;
  partial?: boolean;
}

class TestClassComp extends React.Component<TestClassProps> {
  render() {
    return (
      <div>
        {this.props.some}
      </div>
    );
  }
}

interface TestFunProps0 {
  complex: {
    readonly id: number;
    name: string;
    friends: Array<number>;
  };
}

const TestFunComp0 = (props: TestFunProps0) => (
  <div>
    {props.complex.friends.map((fid) => <div>{fid}</div>)}
  </div>
);

interface TestFunProps1 extends TestFunProps0 {
  world: number;
}

const TestFunComp1 = (props: TestFunProps1) => (
  <div>
    {props.world}
    <TestFunComp0 complex={props.complex} />
  </div>
);

const StyledClassComp0 = createStyled(TestClassComp)({
  width: '200px',
}, (props) => ({
  height: props.theme.long ? '200px' : '100px',
}));

const StyledClassComp1 = createStyled(TestClassComp)`
  width: 200px;
  height: ${(props) => props.theme ? '200px' : '100px'};
`;

interface StyledFunProps {
  color: string;
}

const StyledFunComp0 = createStyled(TestFunComp0)<StyledFunProps>([{
  display: 'inline',
  position: 'fixed',
}, {
  flexGrow: 20,
}], (props, context) => ({
  content: context.name,

  color: props.color,
}));

const StyledFunComp1 = createStyled(TestFunComp0)`
  display: inline;
  position: fixed;
  flexGrow: 20;
  ${(props: StyledFunProps, context) => `
    content: ${context.name};

    color: ${props.color};
  `}
`;

const StyledCompWithButton = StyledClassComp0.withComponent('button');
const StyledCompWithFunComp2 = StyledFunComp0.withComponent(TestFunComp1);

<StyledCompWithButton />;
