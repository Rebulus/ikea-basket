import config from '../cfgs/config';

export const getProductUrl = ({locale, lang, productNumber}) => {
    return `${config.urls.root}/${locale}/${lang}/catalog/products/${productNumber}/`;
};

/**
 * RegExp for a ikea product's URL
 * @desc
 * URL example
 * http://www.ikea.com/ru/ru/catalog/products/S49123839/
 * @type {RegExp}
 */
const urlRegexp = /ikea\.com\/([^/?&=+]+)\/([^/?&=+]+)\/catalog\/products\/([^/?&=+]+)(?:\/#\/)?([^/?&=+]+)?/;

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
            result.productNumber = parsedUrl[4] || parsedUrl[3];
            result.locale = parsedUrl[2];
            result.lang = parsedUrl[1];
        }
    }

    return result;
};

export default {
    getProductUrl,
    getProductParams
}
