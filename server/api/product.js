import config from '../../cfgs/config';
import { getApiUrl } from '../../helpers/url';
import { getFirstProperty } from '../../helpers/object';
import { send } from '../../helpers/request';
import { getId } from '../../helpers/product';
import { log } from '../../helpers/log';

export default {
    get(params) {
        const { locale, lang, productNumber } = params;
        const requestParams = 'type=xml&dataset=normal,allImages,prices,attributes';
        const apiUrl = getApiUrl({ locale, lang });
        const url = `${apiUrl}${productNumber}?${requestParams}`;
        
        return send(url)
            .then((data) => {
                const product = getFirstProperty(data, 'products.product');

                if (!product) {
                    log({
                        event: 'PRODUCT',
                        type: 'no_data',
                        url: url,
                        data: data
                    });

                    return {
                        error: 'Don\'t have data of item'
                    }
                }

                const item = getFirstProperty(product, 'items.item');

                return {
                    id: getId(params),
                    productNumber: productNumber,
                    locale: locale,
                    lang: lang,
                    name: item.name,
                    facts: item.facts,
                    url: config.urls.root + item.URL,
                    imageUrl: getFirstProperty(item, 'images.normal.image.$t'),
                    price: getFirstProperty(item, 'prices.normal.priceNormal.unformatted')
                };
            })
            .catch((error) => {
                log({
                    event: 'PRODUCT',
                    type: 'parse_error',
                    url: url,
                    error: error.message,
                    originalError: error
                });
            });
    }
};
