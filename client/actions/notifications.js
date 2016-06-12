import { guid }  from '../../helpers/object';

export const helpers = {
    guid: guid
};

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const addNotification = (type, message) => (
    {
        type: ADD_NOTIFICATION,
        payload: {
            id: helpers.guid(),
            type,
            message
        }
    }
);

export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const removeNotification = (id) => (
    {
        type: REMOVE_NOTIFICATION,
        payload: {
            id
        }
    }
);

export const REMOVE_ALL_NOTIFICATIONS = 'REMOVE_ALL_NOTIFICATIONS';
export const removeAllNotifications = () => (
    {
        type: REMOVE_ALL_NOTIFICATIONS,
        payload: {}
    }
);