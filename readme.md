# Reactium i18n

This repo is a POC for a translation provider / consumer for React, using strings provided through a gettext strategy.

To see the demo locally:

```sh
npm install
npm run local
```

## Gettext

Gettext is a good 'ole way of translating software, and utilizes some simple functions for identifying strings that can be translated.

In this repo, we are providing two helper functions `__(<string>)` and `_n(<singular>, <plural>, <number>)`, for providing an ordinary string for translation, as well as
to handle a phrase that will vary by some number context for a singular and plural form.

E.g.

### Simple String

```js
const helloWorld = __('Hello World!');
```

### Singular / Plural Form

```js
let numMessages = _n('You have a message.', 'You have messages.', 1); // You have a message
numMessages = _n('You have a message.', 'You have messages.', 2); // You have messages.
```

### Template Generation

Using the node cli tool `gettext-extract`, strings found in the codebase as above will be extracted into a `src/translations/template.pot` template file. Using this file, specific language translations can be prepared using a standard translation tool, such as [Poedit](https://poedit.net/). Those translations can be added to the `src/translations` directory (e.g. `es_MX.po` for Mexican Spanish), without editing any code. Nice separation of concerns for translation.

Install `gettext-extract`:

```sh
npm install -g gettext-extract
```

Configure `gettext-extract` using `.gettext.json` file.

## How it works

Translations are provided into the javascript environment using a webpack loader. See `loaders/po-loader` and how this is added to webpack configuration in `webpack.override.js`.

## React Components

There is a i18n domain in `src/components/i18n`. In your routed page template component, import the TranslationProvider, like so:

```js
import React, { Component } from 'react';
import TranslationProvider from 'components/i18n/TranslationProvider';

export default class Template extends Component {
    render() {
        const { children } = this.props;

        return (
            <TranslationProvider>
                <main>
                    <header>...</header>
                    {children}
                    <footer>...</footer>
                </main>
            </TranslationProvider>
        );
    }
}
```

Now when you have a component that needs translation, you will structure that component like so:

```js
import React, { Component } from 'react';
import { i18nDefaultProps } from 'components/i18n';

export default class HelloWorld extends Component {
    messages(n) {
        const { _n } = this.props;
        return _n('You have a message', 'You have %s messages.', n).replace(
            '%s',
            n,
        );
    }

    render() {
        const { __, numMessages } = this.props;
        return (
            <div>
                <span>{__('Hello World!')}</span>
                <span>{this.messages(numMessages)}</span>
            </div>
        );
    }
}
HelloWorld.defaultProps = {
    numMessages: 5,
    ...i18nDefaultProps,
};
```

Last step, when you use this component, wrap it with the `Translate` component.

```js
import React, { Component } from 'react';
import Template from 'components/Template';
import HelloWorld from 'components/HelloWorld';
import SomeOtherComponent from 'components/SomeOtherComponent';
import { Translate } from 'components/i18n';

export default class MyPage extends Component {
    render() {
        return (
            <Template>
                <Translate>
                    <HelloWorld />
                    <SomeOtherComponent />
                </Translate>
            </Template>
        );
    }
}
```

## Translating on Route

To support translating on route, create a route with a `locale` parameter:

route.js:

```js
import MyPage from './MyPage';
export default {
    path: '/:locale/my-page',
    exact: true,
    component: MyPage,
};
```

Now, when someone visits `/es_MX/my-page`, the `__()` and `_n()` wrapped strings found in `HelloWorld` and `SomeOtherComponent` will be translated to Mexican Spanish if an up to date `src/translations/es_MX.po` file exists.

## Translating with Redux

If I wanted to translate using an action in redux, I would `connect()` some component to the i18n action.

```js
import React from 'react';
import { connect } from 'react-redux';
import deps from 'dependencies';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    setLocale: locale => dispatch(deps.actions.i18n.setLocale(locale)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    ({ setLocale }) => (
        <div className='languages'>
            <button onClick={() => setLocale('es_MX')}>Mexican Spanish</button>
            <button onClick={() => setLocale('en_US')}>US English</button>
        </div>
    ),
);
```
