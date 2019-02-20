import React, { Component } from 'react';
import { I18nProvider, Translate } from 'components/i18n';
import SomeTranslatedComponent from './SomeTranslatedComponent';
import { Link, withRouter } from 'react-router-dom';
import op from 'object-path';

/**
 * -----------------------------------------------------------------------------
 * React Component: InternationalizeTest
 * -----------------------------------------------------------------------------
 */

class InternationalizeTest extends Component {
    render() {
        return (
            <div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '10px',
                        width: '300px',
                    }}>
                    <Link to={'/en_US'}>US English</Link>
                    <Link to={'/es_MX'}>Español de Mexico</Link>
                </div>

                <I18nProvider>
                    <Translate>
                        <SomeTranslatedComponent />
                    </Translate>
                </I18nProvider>
            </div>
        );
    }
}

export default withRouter(InternationalizeTest);
