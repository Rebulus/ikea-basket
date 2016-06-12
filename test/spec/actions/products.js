import { expect } from 'chai';
import * as productsActions from '../../../client/actions/products';
import * as notificationsActions from '../../../client/actions/notifications';

describe('products actions', function() {

    beforeEach(function () {
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
    });

    it('should create an action to request a product', function() {
        const expectedData = {
            type: productsActions.REQUEST_PRODUCT,
            payload: this.productRequest
        };

        expect(productsActions.requestProduct(this.productRequestParams)).to.be.deep.equal(expectedData);
    });

    it('should create an action to receive a product', function() {
        const expectedData = {
            type: productsActions.RECEIVE_PRODUCT,
            payload: this.product
        };

        expect(productsActions.receiveProduct(this.product)).to.be.deep.equal(expectedData);
    });

    it('should create an action to an error of product', function() {
        const errorData = {
            error: 'Some message'
        };
        const expectedData = {
            type: productsActions.ERROR_RECEIVE_PRODUCT,
            payload: errorData
        };

        expect(productsActions.errorReceiveProduct(errorData)).to.be.deep.equal(expectedData);
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

        it('should create an action to fetch a product, if it isn\'t fetched', function(done) {
            this.store = this.mockStore({ products: {} });
            
            const expectedActions = [
                { type: productsActions.REQUEST_PRODUCT, payload: this.productRequest },
                { type: productsActions.RECEIVE_PRODUCT, payload: this.product }
            ];
            this.store.dispatch(productsActions.fetchProductIfNeeded(this.productUrl))
                .then(() => {
                    expect(this.store.getActions()).to.be.deep.equal(expectedActions);
                    expect(this.fetchMock.called(this.apiUrl)).to.be.true;
                })
                .then(done).catch(done);
        });

        it('should create a notification action, if product url can\'t be parsed', function() {
            return this.store.dispatch(productsActions.fetchProductIfNeeded('abcd'))
                .then(() => {
                    var actions = this.store.getActions();
                    var expectedNotificationPayload = {
                        id: actions[0].payload.id,
                        type: 'danger',
                        message: actions[0].payload.message
                    };
                    expect(actions).to.be.deep.equal([
                        { type: notificationsActions.ADD_NOTIFICATION, payload: expectedNotificationPayload }
                    ])
                });
        });

        [
            {
                it: 'should not create an action to fetch a product, if it is fetching',
                store: function() {
                    this.store = this.mockStore({
                        products: {
                            [this.productId]: this.productRequest
                        }
                    });
                }
            },
            {
                it: 'should not create an action to fetch a product, if it is fetched',
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
                this.store.dispatch(productsActions.fetchProductIfNeeded(this.productUrl))
                    .then(() => {
                        expect(this.store.getActions()).to.be.deep.equal([]);
                        expect(this.fetchMock.called(this.apiUrl)).to.be.false;
                    })
                    .then(done).catch(done);
            })
        });
    })

});