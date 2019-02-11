import React, { Component, Fragment } from 'react';
import { __, _n } from 'components/i18n';

/**
 * -----------------------------------------------------------------------------
 * React Component: InternationalizeTest
 * -----------------------------------------------------------------------------
 */
// const __ = message => message; // fake gettext

export default class InternationalizeTest extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { people } = this.props;
        const peopleString = _n('There is %s person', 'There are %s people.', people);
        return (
            <Fragment>
                {__('Fake Internationalized string.')}
                {peopleString.replace('%s', people)}
            </Fragment>
        );
    }
}

InternationalizeTest.defaultProps = {
    people: 3
};
