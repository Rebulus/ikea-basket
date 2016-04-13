import 'whatwg-fetch';
import _ from 'lodash';
import { getId } from '../../helpers/product';
import { getProductParams } from '../../helpers/url';

/**
 * @typedef {Object} Product
 */

/**
 * @typedef {Object} Product~params
 * @property {?string} params.locale
 * @property {?string} params.lang
 * @property {?string} params.productNumber
 */

export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const removeProduct = (productId) => {
    return {
        type: REMOVE_PRODUCT,
        payload: {
            id: productId
        }
    }
};

export const REMOVE_ALL = 'REMOVE_ALL';
export const removeAll = () => {
    return {
        type: REMOVE_ALL,
        payload: {}
    }
};

export const REQUEST_PRODUCT = 'REQUEST_PRODUCT';
/**
 * @param {Product~params} params
 * @returns {Object}
 */
export const requestProduct = (params) => {
    return {
        type: REQUEST_PRODUCT,
        payload: _.extend({}, {
            id: getId(params),
            isFetching: true
        }, params)
    }
};

export const RECEIVE_PRODUCT = 'RECEIVE_PRODUCT';
export const receiveProduct = (product) => {
    return {
        type: RECEIVE_PRODUCT,
        payload: _.extend(product, {
            amount: 1
        })
    }
};

export const CHANGE_AMOUNT = 'CHANGE_AMOUNT';
export const changeAmount = (productId, newAmount) => {
    return {
        type: CHANGE_AMOUNT,
        payload: {
            id: productId,
            newAmount: newAmount
        }
    }
};

/**
 * Fetch product data by product's parameters
 * @param {Product~params} params product's parameters
 */
export const fetchProduct = (params) => {
    const { locale, lang, productNumber } = params;
    return (dispatch) => {
        dispatch(requestProduct(params));
        return fetch(`/api/${locale}/${lang}/products/${productNumber}`)
            .then((response) => response.json())
            .then((product) => {
                dispatch(receiveProduct(product))
            })
    };
};

function shouldFetchProduct(state, productId) {
    const product = state.products[productId];

    // TODO - Need whether to update, when product is fetched?
    return !product || !product.isFetching;
}

export const fetchProductIfNeeded = (url) => {
    return (dispatch, getState) => {
        const params = getProductParams(url);
        const productId = getId(params);
        if (shouldFetchProduct(getState(), productId)) {
            return dispatch(fetchProduct(params));
        } else {
            return Promise.resolve();
        }
    }
};
