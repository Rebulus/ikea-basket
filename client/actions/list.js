export const EDIT_LIST_NAME = 'EDIT_LIST_NAME';
export const editListName = (listId, newName) => (
    {
        type: EDIT_LIST_NAME,
        payload: {
            listId,
            newName
        }
    }
);

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const addProduct = (listId, productId) => (
    {
        type: ADD_PRODUCT,
        payload: {
            listId,
            product: {
                id: productId,
                amount: 1
            }
        }
    }
);

export const CHANGE_AMOUNT = 'CHANGE_AMOUNT';
export const changeAmount = (listId, productId, newAmount) => (
{
    type: CHANGE_AMOUNT,
    payload: {
        listId, 
        productId: productId,
        newAmount: newAmount
    }
}
);

export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const removeProduct = (listId, productId) => (
    {
        type: REMOVE_PRODUCT,
        payload: {
            listId,
            productId: productId
        }
    }
);

export const REMOVE_ALL = 'REMOVE_ALL';
export const removeAll = (listId) => (
    {
        type: REMOVE_ALL,
        payload: {
            listId
        }
    }
);