import actionTypes from './actionTypes';

export default (state = 'es_MX', action) => {
    switch (action.type) {
        case actionTypes.SWITCH_LOCALE: {
            return state === 'en_US' ? 'es_MX' : 'en_US';
        }
        case actionTypes.SET_LOCALE:
            return action.locale;
    }
    return state;
};
