import { expect } from 'chai';
import * as actions from '../../client/actions';

describe('actions', function() {
    
    beforeEach(function () {
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
    
    it('should create an action to remove a product', function() {
        const expectedData = {
            type: actions.REMOVE_PRODUCT,
            payload: {
                id: this.productId
            }
        };
        
        expect(actions.removeProduct(this.productId)).to.be.deep.equal(expectedData);
    });

    it('should create an action to request a product', function() {
        const expectedData = {
            type: actions.REQUEST_PRODUCT,
            payload: this.productRequest
        };

        expect(actions.requestProduct(this.productRequestParams)).to.be.deep.equal(expectedData);
    });
    
    it('should create an action to receive a product', function() {
        const expectedData = {
            type: actions.RECEIVE_PRODUCT,
            payload: this.product
        };

        expect(actions.receiveProduct(this.product)).to.be.deep.equal(expectedData);
    });
    
    describe('async -> ', function() {
        beforeEach(function() {
            this.store = this.mockStore({ products: {} });
            
            this.apiUrl = `/api/${this.product.locale}/${this.product.lang}/products/${this.product.productNumber}`;
            this.productUrl = `http://www.ikea.com/${this.product.locale}/${this.product.lang}/catalog/products/${this.product.productNumber}/`;
            this.fetchMock.mock(this.apiUrl, 'get', this.product);
        });
        
        afterEach(function() {
            this.store.clearActions();
        });
        
        [
            {
                it: 'should create an action to fetch a product, if it isn\'t fetched',
                store: function() {
                    this.store = this.mockStore({ products: {} });
                }
            },
            {
                it: 'should create an action to fetch a product, if it is fetched',
                store: function() {
                    this.store = this.mockStore({
                        products: {
                            [this.productId]: this.product
                        }
                    });
                }
            }
        ].forEach(function(assertItem) {
            it(assertItem.it, function(done) {
                assertItem.store.apply(this);
                const expectedActions = [
                    { type: actions.REQUEST_PRODUCT, payload: this.productRequest },
                    { type: actions.RECEIVE_PRODUCT, payload: this.product }
                ];
                this.store.dispatch(actions.fetchProductIfNeeded(this.productUrl))
                    .then(() => {
                        expect(this.store.getActions()).to.be.deep.equal(expectedActions);
                        expect(this.fetchMock.called(this.apiUrl)).to.be.true;
                    })
                    .then(done).catch(done);
            })
        });
        
        it('should not create an action to fetch a product, if it is fetching', function(done) {
            this.store = this.mockStore({
                products: {
                    [this.productId]: this.productRequest
                }
            });
            this.store.dispatch(actions.fetchProductIfNeeded(this.productUrl))
                .then(() => {
                    expect(this.store.getActions()).to.be.deep.equal([]);
                    expect(this.fetchMock.called(this.apiUrl)).to.be.false;
                })
                .then(done).catch(done);
        });
    })
    
});
