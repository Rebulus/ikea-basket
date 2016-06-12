import { getProductParams } from './url';

export const getId = ({ locale, lang, productNumber }) => {
    if (!locale || !lang || !productNumber) {
        return null
    } else {
        return `${locale}-${lang}-${productNumber}`;
    }
};

export const getIdByUrl = (url) => (getId(getProductParams(url)));

export default {
    getId,
    getIdByUrl
}
