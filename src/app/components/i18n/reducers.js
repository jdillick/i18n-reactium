import deps from 'dependencies';
import op from 'object-path';

export default (state = 'es_MX', action) => {
    switch (action.type) {
        case deps.actionTypes.SWITCH_LOCALE: {
            return state === 'en_US' ? 'es_MX' : 'en_US';
        }

        case deps.actionTypes.UPDATE_ROUTE: {
            return op.get(action, 'params.locale', state);
        }

        case deps.actionTypes.SET_LOCALE: {
            return action.locale;
        }
    }
    return state;
};
