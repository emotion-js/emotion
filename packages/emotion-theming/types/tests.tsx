import * as React from 'react';
import * as emotionTheming from '../';
// tslint:disable-next-line:no-duplicate-imports
import { ThemeProvider, withTheme, EmotionThemingModule } from '../';

const theme = { primary: "green", secondary: "white" };
const CompSFC = (props: { prop: boolean }) => <div />;
declare class CompC extends React.Component<{ prop: boolean }> { }

/**
 * Theme Provider with no type
 */
<ThemeProvider theme={theme} />;
<ThemeProvider theme={() => theme} />;

/**
 * withTheme with no type
 */
const ThemedSFC = withTheme(CompSFC);
<ThemedSFC theme={theme} prop />;
<ThemedSFC prop />;

const ThemedComp = withTheme(CompC);
<ThemedComp theme={theme} prop />;
<ThemedComp prop />;

const { ThemeProvider: TypedThemeProvider, withTheme: typedWithTheme } = emotionTheming as EmotionThemingModule<typeof theme>;

<TypedThemeProvider theme={theme} />;
<TypedThemeProvider theme={{ primary: "white" }} />;
<TypedThemeProvider theme={theme => ({ primary: theme.primary, secondary: theme.secondary })} />;

const TypedThemedSFC = typedWithTheme(ThemedSFC);
<TypedThemedSFC prop />;
<TypedThemedSFC theme={theme} prop/>;

const TypedCompSFC = typedWithTheme(CompSFC);
<TypedCompSFC prop />;
<TypedCompSFC theme={theme} prop />;
