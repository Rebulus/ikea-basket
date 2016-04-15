import _ from 'lodash';

// Actions
import {
    EDIT_LIST_NAME,
    ADD_PRODUCT, REMOVE_PRODUCT, REMOVE_ALL,
    CHANGE_AMOUNT
} from '../actions/list';
import * as listsActions from '../actions/lists';

const list = (state = { name: 'NoName', products: [] }, action) => {
    switch (action.type) {
        case EDIT_LIST_NAME:
            state = _.clone(state);
            state.name = action.payload.newName;
            return state;

        case ADD_PRODUCT:
            if (_.find(state.products, { id: action.payload.product.id })) {
                return state;
            }
            state = _.clone(state);
            state.products = state.products.concat(action.payload.product);
            return state;

        case CHANGE_AMOUNT:
            state = _.clone(state);
            state.products = _.map(state.products, function(product) {
                if (product.id === action.payload.productId) {
                    return {
                        id: product.id,
                        amount: action.payload.newAmount
                    }
                } else {
                    return product;
                }
            });
            return state;

        case REMOVE_PRODUCT:
            state = _.clone(state);
            state.products = _.differenceBy(state.products, [{ id: action.payload.productId }], 'id');
            return state;

        case REMOVE_ALL:
            state = _.clone(state);
            state.products = [];
            return state;

        case listsActions.ADD_LIST:
            state = _.clone(state);
            state.id = action.payload.listId;
            return state;

        default:
            return state;
    }
};

export default list;