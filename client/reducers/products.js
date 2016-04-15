import {
    REQUEST_PRODUCT, RECEIVE_PRODUCT
} from '../actions/products'
import _ from 'lodash';

const products = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_PRODUCT:
        case RECEIVE_PRODUCT:
            state = _.clone(state);
            state[action.payload.id] = action.payload;
            return state;
        default:
            return state;
    }
};

export default products;