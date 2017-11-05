import config from '../../cfgs/config';
import request from 'request';
import _ from 'lodash';
import { getProductUrl } from '../../helpers/url';
import { getFirstProperty } from '../../helpers/object';
import { getId } from '../../helpers/product';
import { log } from '../../helpers/log';

class ProductRequest {
    constructor (params) {
        const { productNumber } = params;
        this.params = params;
        this.url = getProductUrl(params);
        this.productNumber = productNumber;
    }

    get() {
        var defaultError = {
            error: 'Don\'t have data of item'
        };
        return new Promise((resolve, reject) => {
            request
                .get(this.url, (error, response, body) => {
                    if (error) {
                        this.log({
                            type: 'dont_receive_the_product',
                            error: error
                        });
                        reject(defaultError);
                    } else {
                        this.htmlBody = body;
                        if (this.data) {
                            resolve(this.data);
                        } else {
                            reject(defaultError);
                        }
                    }
                })
        });
    }

    log(data = {}) {
        log(_.extend({}, {
            event: 'PRODUCT',
            url: this.url,
            error: data.error && data.error.message,
            originalError: data.error
        }, data))
    }

    get data() {
        var dataString = this._findProductData(this.htmlBody);
        var productData = this._parseProductData(dataString);
        return this._getProductItem(productData);
    }

    _findProductData(htmlBody) {
        if (!htmlBody) {
            return null;
        }

        const bodyMatch = htmlBody.match(/jProductData\s*=\s*(\{.*\});\s*/);
        if (bodyMatch && bodyMatch[1]) {
            return bodyMatch[1];
        } else {
            this.log({
                type: 'cant_find_product_data',
                error: {
                    message: 'Can\'t find product data'
                },
                data: htmlBody.split('jProductData')[1]
            });
            return null;
        }
    }

    _parseProductData(productDataString) {
        if (!productDataString) {
            return null;
        }

        try {
            return JSON.parse(productDataString);
        }
        catch (e) {
            this.log({
                type: 'cant_parse_product_data',
                error: e,
                data: productDataString
            });
            return null;
        }
    }

    _getProductItem(productData) {
        if (!productData) {
            return null;
        }
        
        const productItem = _.chain(productData)
            .get('product.items')
            .find({ partNumber: this.productNumber })
            .value();

        if (!productItem) {
            this.log({
                type: 'cant_find_product_item',
                error: {
                    message: 'Can\'t find product item'
                },
                data: productData
            });
            return null;
        } else {
            return {
                id: getId(this.params),
                productNumber: this.productNumber,
                locale: this.params.locale,
                lang: this.params.lang,
                name: productItem.name,
                facts: productItem.type,
                url: this.url,
                imageUrl: config.urls.root + getFirstProperty(productItem, 'images.normal'),
                price: getFirstProperty(productItem, 'prices.normal.priceNormal.rawPrice'),
                packages: productItem.pkgInfoArr
            };
        }
    }
}

export default {
    get(params) {
        var productRequest = new ProductRequest(params);
        
        return productRequest.get();
    }
};
