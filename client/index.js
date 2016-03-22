import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import Main from './components/main';

// Project styles
require('../node_modules/bootstrap/dist/css/bootstrap.css');

const store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware
    )
);

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('app')
);
