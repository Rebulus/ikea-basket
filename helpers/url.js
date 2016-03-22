import config from '../cfgs/config';

export const getApiUrl = ({locale, lang}) => {
    const langPath = `/${locale}/${lang}`;
    return config.urls.root + langPath + config.urls.product;
};

/**
 * RegExp for a ikea product's URL
 * @desc
 * URL example
 * http://www.ikea.com/ru/ru/catalog/products/S49123839/
 * @type {RegExp}
 */
const urlRegexp = /^(http(s)?:\/\/)?(www\.)?ikea\.com\/([^\/?&=]+)\/([^\/?&=]+)\/catalog\/products\/([^\/?&=]+)(\/)?$/;

/**
 * Parse product's URL and format params for a product's request
 * @param {string} url
 * @returns {{productNumber: ?string, locale: ?string, lang: ?string}}
 */
export const getProductParams = (url) => {
    let result = {
        productNumber: null,
        locale: null,
        lang: null
    };

    if (typeof url === 'string') {
        const parsedUrl = urlRegexp.exec(url);
        if (parsedUrl) {
            result.productNumber = parsedUrl[6];
            result.locale = parsedUrl[4];
            result.lang = parsedUrl[5];
        }
    }

    return result;
};

export default {
    getApiUrl,
    getProductParams
}
