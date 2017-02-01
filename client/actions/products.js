import { fetchRetry } from '../../helpers/fetch';
import { getId } from '../../helpers/product';
import { getProductParams } from '../../helpers/url';
import { addNotification } from './notifications';

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
export const requestProduct = (params) => {
    return {
        type: REQUEST_PRODUCT,
        payload: {
            id: getId(params),
            name: `Pending product ${params.productNumber}`,
            isFetching: true,
            ...params
        }
    }
};

export const RECEIVE_PRODUCT = 'RECEIVE_PRODUCT';
export const receiveProduct = (product) => (
    {
        type: RECEIVE_PRODUCT,
        payload: product
    }
);

export const ERROR_RECEIVE_PRODUCT = 'ERROR_RECEIVE_PRODUCT';
export const errorReceiveProduct = (error) => (
    {
        type: ERROR_RECEIVE_PRODUCT,
        payload: error
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
        return new Promise((resolve) => {
            fetchRetry(`/api/${locale}/${lang}/products/${productNumber}`, { retries: 3 })
                .then(
                    (response) => response.json(),
                    // TODO - need localization
                    (error) => ({ error: 'Failed connection. Please, try again later.' })
                )
                .then(
                    (product) => {
                        if (product.error) {
                            dispatch(errorReceiveProduct({
                                id: getId(params),
                                ...product
                            }));
                            dispatch(addNotification('danger', product.error));
                        } else {
                            dispatch(receiveProduct(product));
                        }
                        resolve(product);
                    }
                )
        });
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
        
        if (!productId) {
            // TODO - need localization
            const errorData = {
                error: 'No correct product\'s URL.'
            };
            dispatch(addNotification('danger', errorData.error));
            return Promise.resolve(errorData);
        }

        if (shouldFetchProduct(getState(), productId)) {
            return dispatch(fetchProduct(params));
        } else {
            var state = getState();
            return Promise.resolve(state.products[productId]);
        }
    }
);
