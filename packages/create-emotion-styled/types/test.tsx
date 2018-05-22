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

interface TestFunProps {
  complex: {
    readonly id: number;
    name: string;
    friends: Array<number>;
  };
}

const TestFunComp = (props: TestFunProps) => (
  <div>
    {props.complex.friends.map((fid) => <div>{fid}</div>)}
  </div>
);

interface TestFunProps2 extends TestFunProps {
  world: number;
}

const TestFunComp2 = (props: TestFunProps2) => (
  <div>
    {props.world}
    <TestFunComp complex={props.complex} />
  </div>
);

const StyledClassComp = createStyled(TestClassComp)({
  width: '200px',
}, (props) => ({
  height: props.theme ? '200px' : '100px',
}));

interface StyledFunProps {
  color: string;
}

const StyledFunComp = createStyled(TestFunComp)<StyledFunProps>([{
  display: 'inline',
  position: 'fixed',
}, {
  flexGrow: 20,
}], (props, context) => ({
  content: context.name,

  color: props.color,
}));

const StyledCompWithButton = StyledClassComp.withComponent('button');
const StyledCompWithFunComp2 = StyledFunComp.withComponent(TestFunComp2);

<StyledCompWithButton />;
