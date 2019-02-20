import deps from 'dependencies';

export default (state = 'es_MX', action) => {
    switch (action.type) {
        case deps.actionTypes.SWITCH_LOCALE: {
            return state === 'en_US' ? 'es_MX' : 'en_US';
        }
        case deps.actionTypes.UPDATE_ROUTE:
            if (action.params.locale) {
                action.locale = action.params.locale;
            }
        case deps.actionTypes.SET_LOCALE:
            return action.locale;
    }
    return state;
};
