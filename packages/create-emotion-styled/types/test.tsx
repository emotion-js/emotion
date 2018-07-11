import createEmotion from 'create-emotion';
import * as React from 'react';

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

const StyledCompShorthand0 = createStyled.a({
  textAlign: 'center',
});
const StyledCompShorthand1 = createStyled.label`
  display: block;

  width: 200px;
  height: 130px;
`;

<StyledCompShorthand0 />;
<StyledCompShorthand1 />;
<StyledCompShorthand1 theme={{}} />;
// $ExpectError
<StyledCompShorthand1 theme={{}} asdfasdf={undefined as any} />;

interface ShorthandProps {
  editor: 'vscode' | 'emacs' | 'sublime';
}

const getEditorLogoColor = (editor: 'vscode' | 'emacs' | 'sublime') => {
  switch (editor) {
    case 'vscode':
      return '007bcd';
    case 'emacs':
      return '5e5ba8';
    case 'sublime':
      return 'ff9800';
  }
};

const StyledCompShorthandWithProps0 = createStyled.div<ShorthandProps>(props => ({
  backgroundColor: getEditorLogoColor(props.editor),
}));
const StyledCompShorthandWithProps1 = createStyled.section`
  backgroundColor: ${(props: ShorthandProps) => getEditorLogoColor(props.editor)};
`;

<StyledCompShorthandWithProps0 editor='emacs' />;
<StyledCompShorthandWithProps0 editor='vscode' innerRef={() => {}} />;
<StyledCompShorthandWithProps1 editor={'sublime'} theme={{}} />;
// $ExpectError
<StyledCompShorthandWithProps0 editor='emacs' other={'thing' as any} />;

// $ExpectError
createStyled.asdf;

const ComposingComp = createStyled.div`
  ${StyledCompShorthand0} {
    color: black;
  }
`;

const CSSPropComp = createStyled.div();
<CSSPropComp css={{ color: 'blue' }} />;
<CSSPropComp css={`
  color: blue;
  `}
/>;

interface TestComponentTypeProps {
  value: number;
}

declare const TestComponentType: React.ComponentType<TestComponentTypeProps>;

const StyledComponentType0 = createStyled(TestComponentType)({
  color: 'red',
});

const StyledComponentType1 = createStyled(TestComponentType)`
  color: red;
`;

const ComposingCompType = createStyled.div`
  ${StyledComponentType1} {
    background-color: green;
  }
`;

<StyledComponentType0 value={5} />;
<StyledComponentType1 value={4} />;
<ComposingCompType />;
