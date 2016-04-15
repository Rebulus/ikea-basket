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

export const REMOVE_LIST = 'REMOVE_LIST';
export const removeList = (listId) => (
    {
        type: REMOVE_LIST,
        payload: {
            listId
        }
    }
);
