import React, { Component } from 'react';
import { i18nDefaultProps } from 'components/i18n';

export default class SomeTranslatedComponent extends Component {
    render() {
        const { __, _n, people, locale, toggleLocale } = this.props;

        const peopleString = _n(
            'There is %s person',
            'There are %s people.',
            people,
        );
        const hello = __('Hello World.');

        return (
            <>
                <div>
                    Locale: {locale}
                    <button onClick={() => toggleLocale()}>
                        Toggle Locale
                    </button>
                </div>
                {__('Fake Internationalized string.')}
                {peopleString.replace('%s', people)}
            </>
        );
    }
}

SomeTranslatedComponent.defaultProps = {
    people: 3,
    ...i18nDefaultProps,
};
