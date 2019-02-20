import TranslationContext from './context';
import React, { Component } from 'react';
import Jed from 'jed';

const getLocale = () => {
    const langRaw = window.navigator.userLanguage || window.navigator.language;
    const [lang, location] = langRaw.replace('-', '_').split('_');
    return `${lang}_${location}`;
};

const getStrings = locale => {
    let context;
    if (!locale) {
        locale = getLocale();
    }

    if (typeof window !== 'undefined') {
        context = require.context(
            'babel-loader!po-loader!../../../translations',
            true,
            /.pot?$/,
        );
        if (
            context.keys().find(translation => translation === `./${locale}.po`)
        ) {
            return context(`./${locale}.po`);
        }

        return context('./template.pot');
    } else {
        // ssr version
    }
};

export default class Provider extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.locale !== this.props.locale;
    }

    render() {
        const { locale, children } = this.props;

        return (
            <TranslationContext.Provider
                value={{
                    i18n: new Jed(JSON.parse(getStrings(locale).strings)),
                }}>
                {children}
            </TranslationContext.Provider>
        );
    }
}
Provider.defaultProps = {
    locale: 'en_US',
};
