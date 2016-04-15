import _ from 'lodash';

// Actions
import * as listActions from '../actions/list';
import {
    ADD_LIST,
    REMOVE_LIST
} from '../actions/lists';

// Reducers
import listReducer from './list';

const lists = (reducer, listActions) => (state = {}, action) => {
    switch (action.type) {
        case ADD_LIST:
            state = _.clone(state);
            state[action.payload.listId] = reducer(undefined, action);
            return state;

        case REMOVE_LIST:
            state = _.clone(state);
            delete state[action.payload.listId];
            return state;

        // List actions:
        case listActions.EDIT_LIST_NAME:
        case listActions.ADD_PRODUCT:
        case listActions.CHANGE_AMOUNT:
        case listActions.REMOVE_PRODUCT:
        case listActions.REMOVE_ALL:
            state = _.clone(state);
            state[action.payload.listId] = reducer(state[action.payload.listId], action);
            return state;
        
        default:
            return state;
    }
};

export default lists(listReducer, listActions);