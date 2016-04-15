import { combineReducers } from 'redux';
import lists from './lists';
import products from './products';

const ikeaBasket = combineReducers({
    lists,
    products
});

export default ikeaBasket