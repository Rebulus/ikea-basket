import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { compose, createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import persistState from 'redux-localstorage';
import createLogger from 'redux-logger';

// Project styles
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import { fetchProduct } from './actions/products';
import Main from './components/main';

const loggerMiddleware = createLogger();
const createPersistentStore = compose(
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ),
    persistState(null, {
        key: 'ikea-basket',
        slicer: (paths) => (state) => {
            state = _.clone(state);
            state.lists = state.lists.present;
            delete state.notifications;
            return state;
        },
        merge: (initialState, persistedState) => {
            const state = _.clone(initialState) || reducers(undefined, {});
            if (persistedState) {
                state.lists.present = persistedState.lists;
                state.products = persistedState.products;
            }
            return state;
        }
    })
)(createStore);

const store = createPersistentStore(reducers);

// Recall request from the previous not received products
_.each(store.getState().products, function(product) {
    if (product.isFetching) {
        store.dispatch(fetchProduct(product));
    }
});

document.addEventListener('keydown', function(event) {
    if (event.keyCode == 90 && (event.ctrlKey || event.metaKey)) {
        if (event.shiftKey) {
            store.dispatch(ActionCreators.redo());
        } else {
            store.dispatch(ActionCreators.undo());
        }
    }
});

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('app')
);
