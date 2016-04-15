import { getProductParams } from './url';

export const getId = ({ locale, lang, productNumber }) => (`${locale}-${lang}-${productNumber}`);

export const getIdByUrl = (url) => (getId(getProductParams(url)));

export default {
    getId,
    getIdByUrl
}
