import { combineReducers } from 'redux';
import undoable from 'redux-undo';
import lists from './lists';
import products from './products';

const ikeaBasket = combineReducers({
    lists: undoable(lists, {
        limit: 20
    }),
    products
});

export default ikeaBasket