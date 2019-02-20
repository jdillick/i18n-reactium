import React, { Component } from 'react';
import TranslationContext from './context';

const helpers = i18n => ({
    __: message => i18n.gettext(message),
    _n: (singular, plural, count) => i18n.ngettext(singular, plural, count),
});

export const mockHelpers = {
    __: _ => _,
    _n: _ => _,
};

export default class TranslationConsumer extends Component {
    render() {
        const { children, ...props } = this.props;
        return (
            <TranslationContext.Consumer>
                {(context = {}) => {
                    return React.Children.map(children, Child => {
                        return React.cloneElement(Child, {
                            ...props,
                            ...('i18n' in context
                                ? helpers(context.i18n)
                                : mockHelpers),
                        });
                    });
                }}
            </TranslationContext.Consumer>
        );
    }
}
TranslationContext.defaultProps = {
    locale: 'en_US',
};
