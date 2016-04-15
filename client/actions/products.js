import 'whatwg-fetch';
import _ from 'lodash';
import { getId } from '../../helpers/product';
import { getProductParams } from '../../helpers/url';

/**
 * @typedef {Object} Product
 */

/**
 * @typedef {Object} Product~params
 * @property {?string} locale
 * @property {?string} lang
 * @property {?string} productNumber
 */

export const REQUEST_PRODUCT = 'REQUEST_PRODUCT';
/**
 * @param {Product~params} params
 * @returns {Object}
 */
export const requestProduct = (params) => (
    {
        type: REQUEST_PRODUCT,
        payload: _.extend({}, {
            id: getId(params),
            isFetching: true
        }, params)
    }
);

export const RECEIVE_PRODUCT = 'RECEIVE_PRODUCT';
export const receiveProduct = (product) => (
    {
        type: RECEIVE_PRODUCT,
        payload: product
    }
);

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

    return !product;
}

export const fetchProductIfNeeded = (url) => (
    (dispatch, getState) => {
        const params = getProductParams(url);
        const productId = getId(params);
        if (shouldFetchProduct(getState(), productId)) {
            return dispatch(fetchProduct(params));
        } else {
            return Promise.resolve();
        }
    }
);
