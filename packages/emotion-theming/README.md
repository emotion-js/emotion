# emotion-theming

> A CSS-in-JS theming solution for React(-like) views.

*`emotion-theming` is a managed fork of [iamstarkov/theming](https://github.com/iamstarkov/theming), for use by emotion and anyone else.*


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [API](#api)
  * [ThemeProvider](#themeprovider)
  * [withTheme](#withthemecomponent)
  * [channel](#channel)
  * [themeListener](#themeListener)
  * [createTheming](#createthemingcustomchannel)
* [Credits](#credits)
* [License](#license)


## Install


```bash
# add --save if using npm@4 or lower
npm i emotion-theming

# or
yarn add emotion-theming
```

## Usage

Theming is accomplished by placing a special higher-order component (HOC), `ThemeProvider`, at the top of the React component tree and wrapping descendants as-needed with a receiver component: `withTheme`. This metacomponent seamlessly acquires the current theme and injects it as a "prop" into your own component.

Here is a complete example for a typical React + Emotion app (information about each piece of the theming API is listed afterward):

```jsx
/** child.js */
import React from 'react';
import styled from 'react-emotion';
import { withTheme } from 'emotion-theming';

const Container = styled.div`
  background: whitesmoke;
  height: 100vh;
`;

const Headline = withTheme(styled.h1`
  color: ${props => props.theme.color};
  font: 20px/1.5 sans-serif;
`);

export default Page extends React.Component {
  render() {
    return (
      <Container>
        <Headline>
          I'm red!
        </Headline>
      </Container>
    );
  }
}

/** parent.js */
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'emotion-theming';

import Page from './child.js';

const theme = {
  color: 'red',
};

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Page />
      </ThemeProvider>
    );
  }
}

// this assumes the HTML page template has a <main> element already inside <body>
ReactDOM.render(<App />, document.querySelector('main'));
```

`<ThemeProvider>` acts as a conductor in the component hierarchy and themed components receive the `theme` for whatever purposes are necessary, be it styling or perhaps toggling a piece of functionality.


## API

### ThemeProvider: ReactComponent

A React higher-order component that passes the theme object down the component tree via [context](https://facebook.github.io/react/docs/context.html). Additional `<ThemeProvider>` wrappers may be added deeper in the hierarchy to override the original theme. The theme object will be merged into its ancestor as if by [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).

*Accepts:*
* **`children`: ReactComponent** - A single React component.
* **`theme`: Object|Function** - An object or function that provides an object.

```jsx
import React from 'react';
import { ThemeProvider, withTheme } from 'emotion-theming';

// object-style theme

const theme = {
  backgroundColor: 'green',
  color: 'red',
};

// function-style theme; note that if multiple <ThemeProvider> are used,
// the parent theme will be passed as a function argument

const adjustedTheme = ancestorTheme => ({ ...ancestorTheme, color: 'blue' });

class Container extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ThemeProvider theme={adjustedTheme}>
          <Text>
            Boom shaka laka!
          </Text>
        </ThemeProvider>
      </ThemeProvider>
    );
  }
}

const Text = withTheme(styled.div`
  background-color: ${props => props.theme.backgroundColor};  // will be green
  color: ${props => props.theme.color};                       // will be blue
`);
```


### withTheme(component: ReactComponent): Function

A function that wraps a given component in a specialized higher-order component. This "receiver" provides the current theme as a "prop" to the wrapped child and listens for changes. If the theme is updated, the child component will be re-rendered accordingly.

```jsx
import PropTypes from 'prop-types';
import React from 'react';
import { withTheme } from 'emotion-theming';

const Text = withTheme(styled.div`
  color: ${props => props.theme.color};
`);

class TellMeTheColor extends React.Component {
  render() {
    return (
      <div>
        The color is {this.props.color}.
      </div>
    );
  }
}

TellMeTheColor.propTypes = {
  theme: PropTypes.shape({
    color: PropTypes.string,
  }),
};

const TellMeTheColorWithTheme = withTheme(TellMeTheColor);
```

### channel: String

The theming package uses this string as the React context key by default.

If you wish to build your own components on top of this library, it is recommended to import the context key from this package instead of hardcoding its value.

```js
import { channel } from 'emotion-theming';

console.log(channel); '__THEMING__';
```

### themeListener: Function

An advanced helper to hook theming into any React component.

```jsx
import { themeListener } from 'emotion-theming';

function CustomWithTheme(Component) {
  return class CustomWithTheme extends React.Component {
    static contextTypes = themeListener.contextTypes;
    constructor(props, context) {
      super(props, context);
      this.state = { theme: themeListener.initial(context) };
      this.setTheme = theme => this.setState({ theme });
    }
    componentDidMount() {
      this.unsubscribe = themeListener.subscribe(this.context, this.setTheme);
    }
    componentWillUnmount() {
      if (typeof this.unsubscribe === 'function') {
        this.unsubscribe();
      }
    }
    render() {
      const { theme } = this.state;
      return <Component theme={theme} {...this.props} />;
    }
  }
}
```

themeListener is an `Object` with following fields:

* `themeListener.contextTypes`
  * type: `Object`
  * meant to be added your component's contextTypes:
    ```js
    static contextTypes = themeListener.contextTypes;
    // or
    static contextTypes = Object.assign({}, themeListener.contextTypes, {
      /* your Component's contextTypes */
    });
    ```
* `themeListener.initial`
  * type: `Function`
  * takes a single context `Object`, where `context` is `context` of your component
  * meant to be used in `constructor`
  * throws an error if your component will be used outside ThemeProvider
  * example:
    ```js
    constructor(props, context) {
      super(props, context);
      this.state = { theme: themeListener.initial(context) }
    }
    ```
* `themeListener.subscribe`
  * type: `Function`
  * takes 2 arguments:
    * context `Object`, where `context` is `this.context` from your component
    * callback `Function`, which in turn will be invoked with theme update `Object`, every time theme is updated in `ThemeProvider`
  * meant to be used in `componentDidMount`
  * returns unsubscribe `Function`, which you should invoke in `componentWillUnmount`
  * example:
    ```js
    componentDidMount() {
      this.unsubscribe = themeListener.subscribe(this.context, theme => this.setState({ theme }));
    }
    componentWillUnmount() {
      if (typeof this.unsubscribe === 'function') {
        this.unsubscribe();
      }
    }
    ```

### createTheming(channel: String): Function

A helper function to create the various higher-order components and functions above with a custom context channel. This could be useful if multiple theme contexts need to be used within the same project and overlap is not desired.

```js
import { createTheming } from 'emotion-theming';

const theming = createTheming('__alternate-theming__');

const { channel, withTheme, ThemeProvider, themeListener } = theming;

export default {
  channel,
  withTheme,
  ThemeProvider,
  themeListener,
};
```

A few potential uses:

* Managing the activation state of features in your app
* An alternative to react-intl for passing localized strings into your components, anywhere in the hierarchy
* Creating a hard distinction between user customization and system customization


## Credits

Thank you very much to [Vladimir Starkov](https://iamstarkov.com/), who originally wrote this library.


## License

MIT 2017-present
