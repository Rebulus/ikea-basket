import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { compose, createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import persistState from 'redux-localstorage';
import createLogger from 'redux-logger';
import { fetchProduct } from './actions/products'
import Main from './components/main';

// Project styles
require('../node_modules/bootstrap/dist/css/bootstrap.css');

const loggerMiddleware = createLogger();
const createPersistentStore = compose(
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ),
    persistState(null, {
        key: 'ikea-basket'
    })
)(createStore);

const store = createPersistentStore(reducers);

// Recall request from the previous not received products
_.each(store.getState().products, function(product) {
    if (product.isFetching) {
        store.dispatch(fetchProduct(product));
    }
});

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('app')
);
