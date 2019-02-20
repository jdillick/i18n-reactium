import actions from './actions';
import { connect } from 'react-redux';
import Provider from './TranslationProvider';
import Consumer, { mockHelpers } from './TranslationConsumer';

const mapStateToProps = state => ({
    locale: state.i18n,
});

const mapDispatchToProps = dispatch => ({
    toggleLocale: () => dispatch(actions.toggleLocale()),
    setLocale: (locale = 'en_US') => dispatch(actions.setLocale(locale)),
});

export const I18nProvider = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Provider);

export const Translate = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Consumer);

export const i18nDefaultProps = {
    ...mockHelpers,
};
