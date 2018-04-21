# emotion-theming

> A CSS-in-JS theming solution for React(-like) views.

*`emotion-theming` is a theming library inspired by [styled-components](https://github.com/styled-components/styled-components)*


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [API](#api)
  * [ThemeProvider](#themeprovider)
  * [withTheme](#withthemecomponent)
  * [channel](#channel)
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

Theming is accomplished by placing the `ThemeProvider` component, at the top of the React component tree and wrapping descendants with the `withTheme` higher-order component (HOC). This HOC seamlessly acquires the current theme and injects it as a "prop" into your own component.

The theme prop is automatically injected into components created with `react-emotion`'s `styled`.

Here is a complete example for a typical React + Emotion app (information about each piece of the theming API is listed afterward):

```jsx
/** child.js */
import React from 'react';
import styled from 'react-emotion';

const Container = styled.div`
  background: whitesmoke;
  height: 100vh;
`

const Headline = styled.h1`
  color: ${props => props.theme.color};
  font: 20px/1.5 sans-serif;
`

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

A React component that passes the theme object down the component tree via [context](https://facebook.github.io/react/docs/context.html). Additional `<ThemeProvider>` wrappers may be added deeper in the hierarchy to override the original theme. The theme object will be merged into its ancestor as if by [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign). If a function is passed instead of an object it will be called with the ancestor theme and the result will be the new theme.

*Accepts:*
* **`children`: ReactComponent** - A single React component.
* **`theme`: Object|Function** - An object or function that provides an object.

```jsx
import React from 'react';
import styled from 'react-emotion'
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

const Text = styled.div`
  background-color: ${props => props.theme.backgroundColor};  // will be green
  color: ${props => props.theme.color};                       // will be blue
`
```


### withTheme(component: ReactComponent): Function

A higher-order component that provides the current theme as a prop to the wrapped child and listens for changes. If the theme is updated, the child component will be re-rendered accordingly.

```jsx
import PropTypes from 'prop-types';
import React from 'react';
import { withTheme } from 'emotion-theming';

class TellMeTheColor extends React.Component {
  render() {
    return (
      <div>
        The color is {this.props.theme.color}.
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

The emotion-theming package uses this string as the React context key by default.

If you wish to build your own components on top of this library, it is recommended to import the context key from this package instead of hardcoding its value.

```js
import { channel } from 'emotion-theming';

console.log(channel); '__EMOTION_THEMING__';
```

### createBroadcast: Function

Creates a broadcast that is used to listen to theme events via context. This is probably only useful for testing.
If you have styled components that depend on `theme` via `ThemeProvider`, one option is to wrap all your components being tested
in `ThemeProvider`. However if you're using `enzyme`, you'll lose the ability to call some methods that require it to be run on the root instance.
Instead you can `mount` a component a pass the channel and broadcast as part of `context`.

```js
import {channel, createBroadcast} from 'emotion-theming';
import {mount} from 'enzyme';
import PropTypes from 'prop-types';
import React from 'react';

describe('emotion-theming', function() {
  it('can use theme from a ThemeProvider', function() {
    const myTheme = {color: 'green'};
    const broadcast = createBroadcast(myTheme);
    const wrapper = mount(<MyComponent />, {
      context: {
        [channel]: broadcast,
      },
      childContextTypes: {
        [channel]: PropTypes.object,
      },
    });

    wrapper.setState({foo: 'bar'});
    expect(wrapper.state('foo')).toBe('bar');
  });
});
```



## Credits

Thanks goes to the [styled-components team](https://github.com/styled-components/styled-components) and [their contributors](https://github.com/styled-components/styled-components/graphs/contributors) who originally wrote this.


## License

MIT 2017-present
