import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import ikeaBasket from '../../client/reducers';
import * as actions from '../../client/actions';

describe('reducers', function() {

    beforeEach(function() {
        this.productId = 'ru-ru-089367';
        this.product = {
            id: this.productId,
            productNumber: '089367',
            locale: 'ru',
            lang: 'ru',
            name: 'Some product'
        };
        this.productRequestParams = {
            productNumber: this.product.productNumber,
            locale: this.product.locale,
            lang: this.product.lang
        };
        this.productRequest = {
            id: this.productId,
            isFetching: true,
            productNumber: this.product.productNumber,
            locale: this.product.locale,
            lang: this.product.lang
        };
    });

    it('should add fetching product in product\'s list', function() {
        const store = {
            products: {}
        };
        deepFreeze(store);
        const expectedStore = {
            products: {
                [this.productId]: this.productRequest
            }
        };
        
        expect(ikeaBasket(store, actions.requestProduct(this.productRequestParams))).to.be.deep.equal(expectedStore);
    });
    
    it('should add product in product\'s list', function() {
        const store = {
            products: {}
        };
        deepFreeze(store);
        const expectedStore = {
            products: {
                [this.productId]: this.product
            }
        };
        
        expect(ikeaBasket(store, actions.receiveProduct(this.product))).to.be.deep.equal(expectedStore);
    });

    it('should remove product from product\'s list', function() {
        const store = {
            products: {
                [this.productId]: this.product
            }
        };
        deepFreeze(store);
        const expectedStore = {
            products: {}
        };
        
        expect(ikeaBasket(store, actions.removeProduct(this.productId))).to.be.deep.equal(expectedStore);
    });
    
    it('should remove all products from product\'s list', function() {
        const store = {
            products: {
                [this.productId]: this.product,
                'ru-ru-0812391': {}
            }
        };
        deepFreeze(store);
        const expectedStore = {
            products: {}
        };

        expect(ikeaBasket(store, actions.removeAll())).to.be.deep.equal(expectedStore);
    })

});
