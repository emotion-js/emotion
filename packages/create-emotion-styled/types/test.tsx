import createEmotion from 'create-emotion';
import React from 'react';

import createEmotionStyled, { StyledComponent } from '../';

const context = {
  name: 'emotion',
};

const emotion = createEmotion(context);
const createStyled = createEmotionStyled(emotion, React);

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

const StyledClassComp1 = createStyled(TestClassComp) `
  width: 200px;
  height: ${(props) => props.theme ? '200px' : '100px'};
`;

<StyledClassComp0 some={5} />;
<StyledClassComp0 some={2} innerRef={(x: TestClassComp) => { }} />;

<StyledClassComp1 some={5} />;
<StyledClassComp1 some={2} innerRef={(x: TestClassComp) => { }} />;
<StyledClassComp1 some={2} theme={{ x: 5 }} innerRef={(x: TestClassComp) => { }} />;

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

const StyledFunComp1 = createStyled(TestFunComp0) `
  display: inline;
  position: fixed;
  flexGrow: 20;
  ${(props: StyledFunProps, context) => emotion.css`
    content: ${context.name};

    color: ${props.color};
  `}
`;

<StyledFunComp0 color='123' complex={{ id: 4, name: 'abc', friends: [] }} />;
// $ExpectError
<StyledFunComp0 color='123' complex={{ id: 4, name: 'abc', friends: [] }} innerRef={undefined as any} />;

interface StyledTagProps {
  typing: number;
}

const StyledTag0 = createStyled('div')<StyledTagProps>({
  margin: 20,
  marginBottom: '30px',
}, (props) => ({
  display: Number.isFinite(props.typing) ? 'flex' : 'block',
}));

const StyledTag1 = createStyled('label')`
  width: 20px;
  height: 50px;

  background-color: green;

  display: ${(props: StyledTagProps) => {
    return Number.isFinite(props.typing) ? 'flex' : 'block';
  }};
`;

<StyledTag0 typing={NaN} />;
<StyledTag0 typing={Infinity} innerRef={(ref: HTMLDivElement) => { ref = ref; }} />;
<StyledTag0 typing={5} onClick={() => ''} />;

<StyledTag1 typing={NaN} />;
<StyledTag1 typing={Infinity} innerRef={(ref: HTMLDivElement) => { ref = ref; }} />;
<StyledTag1 typing={5} onClick={() => ''} />;

const StyledCompWithButton = StyledClassComp0.withComponent('button');
const StyledCompWithFunComp2 = StyledFunComp0.withComponent(TestFunComp1);

<StyledCompWithButton />;
<StyledCompWithButton onClick={() => ''} />;
<StyledCompWithButton onClick={() => ''} innerRef={(ref: HTMLButtonElement) => { }} />;

<StyledCompWithFunComp2 color='#ffff00' complex={{ id: 42, name: 'truth', friends: [69] }} world={1} />;
// $ExpectError
<StyledCompWithFunComp2 color='#ffff00' complex={{ id: 42, name: 'truth', friends: [69] }} world={1} innerRef={() => ''} />;
