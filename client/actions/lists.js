import { guid }  from '../../helpers/object';

export const helpers = {
    guid: guid
};

export const ADD_LIST = 'ADD_LIST';
export const addList = () => (
    {
        type: ADD_LIST,
        payload: {
            listId: helpers.guid()
        }
    }
);

export const SELECT_LIST = 'SELECT_LIST';
export const selectList = (listId) => (
    {
        type: SELECT_LIST,
        payload: {
            listId
        }
    }
);

export const REMOVE_LIST = 'REMOVE_LIST';
export const removeList = (listId) => (
    {
        type: REMOVE_LIST,
        payload: {
            listId
        }
    }
);
