import _ from 'lodash';

// Actions
import * as listActions from '../actions/list';
import {
    ADD_LIST, SELECT_LIST, REMOVE_LIST
} from '../actions/lists';

// Reducers
import listReducer from './list';


/**
 * Find current (selected) list
 * @param {object} [state]
 * @returns {?string}
 */
const getCurrent = (state = {}) => {
    const lists = _.keys(state.items);

    if (lists.length > 1) {
        if (!state.current) {
            return _.last(lists);
        } else {
            const currentListIndex = _.indexOf(lists, state.current);
            const nextListId = lists[currentListIndex + 1];
            const previousListId = lists[currentListIndex - 1];

            if (nextListId) {
                return nextListId;
            } else {
                return previousListId;
            }
        }
    }

    return null;
};

const lists = (reducer, listActions) => (state = { items: {}, current: null }, action) => {
    switch (action.type) {
        case ADD_LIST:
            state = _.clone(state);
            state.items = _.clone(state.items);
            state.items[action.payload.listId] = reducer(undefined, action);
            state.current = action.payload.listId;
            return state;
        
        case SELECT_LIST:
            state = _.clone(state);
            state.current = action.payload.listId;
            return state;

        case REMOVE_LIST:
            state = _.clone(state);
            state.items = _.clone(state.items);
            if (state.current === action.payload.listId) {
                state.current = getCurrent(state);
            }
            delete state.items[action.payload.listId];
            return state;

        // List actions:
        case listActions.EDIT_LIST_NAME:
        case listActions.ADD_PRODUCT:
        case listActions.CHANGE_AMOUNT:
        case listActions.REMOVE_PRODUCT:
        case listActions.REMOVE_ALL:
            state = _.clone(state);
            state.items = _.clone(state.items);
            state.items[action.payload.listId] = reducer(state.items[action.payload.listId], action);
            return state;
        
        default:
            return state;
    }
};

export default lists(listReducer, listActions);