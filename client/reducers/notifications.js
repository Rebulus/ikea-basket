import _ from 'lodash';
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION, REMOVE_ALL_NOTIFICATIONS } from '../actions/notifications';

const notifications = (state = [], action) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return state.concat([action.payload]);
        case REMOVE_NOTIFICATION:
            state = _.differenceBy(state, [{ id: action.payload.id }], 'id');
            return state;
        case REMOVE_ALL_NOTIFICATIONS:
            return [];
        default:
            return state;
    }
};

export default notifications;