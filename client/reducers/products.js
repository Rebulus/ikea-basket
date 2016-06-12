import {
    REQUEST_PRODUCT, RECEIVE_PRODUCT, ERROR_RECEIVE_PRODUCT
} from '../actions/products'
import _ from 'lodash';

const products = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_PRODUCT:
        case RECEIVE_PRODUCT:
            state = _.clone(state);
            state[action.payload.id] = action.payload;
            return state;
        case ERROR_RECEIVE_PRODUCT:
            state = _.clone(state);
            delete state[action.payload.id];
            return state;
        default:
            return state;
    }
};

export default products;