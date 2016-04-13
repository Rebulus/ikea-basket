import {
    REMOVE_PRODUCT, REMOVE_ALL, 
    REQUEST_PRODUCT, RECEIVE_PRODUCT
} from '../actions'
import _ from 'lodash';

const products = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_PRODUCT:
        case RECEIVE_PRODUCT:
            state = _.clone(state);
            state[action.payload.id] = action.payload;
            return state;
        case REMOVE_PRODUCT:
            state = _.clone(state);
            delete state[action.payload.id];
            return state;
        case REMOVE_ALL:
            return {};
        default:
            return state;
    }
};

export default products;
