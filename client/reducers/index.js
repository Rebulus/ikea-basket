import { combineReducers } from 'redux';
import undoable from 'redux-undo';
import lists from './lists';
import products from './products';
import notifications from './notifications';

const ikeaBasket = combineReducers({
    lists: undoable(lists, {
        limit: 20
    }),
    products,
    notifications
});

export default ikeaBasket;