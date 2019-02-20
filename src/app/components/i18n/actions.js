import actionTypes from './actionTypes';

export default {
    toggleLocale: () => ({
        type: actionTypes.SWITCH_LOCALE,
    }),

    setLocale: (locale = 'en_US') => ({
        type: actionTypes.SET_LOCALE,
        locale,
    }),
};
