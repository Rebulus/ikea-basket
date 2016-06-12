import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import productsReducer from '../../../client/reducers/products';
import * as productsActions from '../../../client/actions/products';

describe('products reducer', function() {

    beforeEach(function() {
        this.productId = 'ru-ru-089367';
        this.product = {
            id: this.productId,
            productNumber: '089367',
            locale: 'ru',
            lang: 'ru',
            name: 'Some product',
            amount: 1
        };
        this.productRequestParams = {
            productNumber: this.product.productNumber,
            locale: this.product.locale,
            lang: this.product.lang
        };
        this.productRequest = {
            id: this.productId,
            name: `Pending product ${this.product.productNumber}`,
            isFetching: true,
            productNumber: this.product.productNumber,
            locale: this.product.locale,
            lang: this.product.lang
        };
        this.productError = {
            id: this.productId,
            error: 'Some error message'
        }
    });

    it('should add fetching product in product\'s list', function() {
        const store = {};
        deepFreeze(store);
        const expectedStore = {
            [this.productId]: this.productRequest
        };

        expect(productsReducer(store, productsActions.requestProduct(this.productRequestParams))).to.be.deep.equal(expectedStore);
    });

    it('should add product in product\'s list', function() {
        const store = {};
        deepFreeze(store);
        const expectedStore = {
            [this.productId]: this.product
        };

        expect(productsReducer(store, productsActions.receiveProduct(this.product))).to.be.deep.equal(expectedStore);
    });

    it('should remove fetching product, if it is loaded with error', function() {
        const store = {
            [this.productId]: this.productRequest
        };
        deepFreeze(store);
        const expectedStore = {};

        expect(productsReducer(store, productsActions.errorReceiveProduct(this.productError))).to.be.deep.equal(expectedStore);
    });

});