import React, { Component } from 'react';
import { I18nProvider, Translate } from 'components/i18n';
import SomeTranslatedComponent from './SomeTranslatedComponent';
import { Link } from 'react-router-dom';

/**
 * -----------------------------------------------------------------------------
 * React Component: InternationalizeTest
 * -----------------------------------------------------------------------------
 */
// const __ = message => message; // fake gettext

export default class InternationalizeTest extends Component {
    render() {
        return (
            <I18nProvider>
                <Translate>
                    <SomeTranslatedComponent />
                </Translate>
            </I18nProvider>
        );
    }
}
