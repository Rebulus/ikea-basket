import { expect } from 'chai';
import * as listActions from '../../../client/actions/list';
import * as notificationsActions from '../../../client/actions/notifications';

describe('list actions', function() {

    beforeEach(function () {
        this.listId = 'list-345';
        this.productId = 'ru-ru-089367';
    });

    it('should create an action to edit name of list', function() {
        const expectedData = {
            type: listActions.EDIT_LIST_NAME,
            payload: {
                listId: this.listId,
                newName: 'test name'
            }
        };

        expect(listActions.editListName(this.listId, 'test name')).to.be.deep.equal(expectedData);
    });

    it('should create an action to add product', function() {
        const expectedData = {
            type: listActions.ADD_PRODUCT,
            payload: {
                listId: this.listId,
                product: {
                    id: this.productId,
                    amount: 1
                }
            }
        };

        expect(listActions.addProduct(this.listId, this.productId)).to.be.deep.equal(expectedData);
    });
    
    it('should create an action to change amount of list\'s product', function() {
        const expectedData = {
            type: listActions.CHANGE_AMOUNT,
            payload: {
                listId: this.listId,
                productId: this.productId,
                newAmount: 2
            }
        };

        expect(listActions.changeAmount(this.listId, this.productId, 2)).to.be.deep.equal(expectedData);
    });

    it('should create an action to remove a product', function() {
        const expectedData = {
            type: listActions.REMOVE_PRODUCT,
            payload: {
                listId: this.listId,
                productId: this.productId
            }
        };

        expect(listActions.removeProduct(this.listId, this.productId)).to.be.deep.equal(expectedData);
    });

    it('should create an action to remove all products', function() {
        const expectedData = {
            type: listActions.REMOVE_ALL,
            payload: {
                listId: this.listId
            }
        };

        expect(listActions.removeAll(this.listId)).to.be.deep.equal(expectedData);
    });

    describe('check existence of product ->', function() {
        afterEach(function() {
            this.store.clearActions();
        });

        it('should create an action to add a product, if it is not existed', function() {
            this.store = this.mockStore({
                lists: {
                    present: {
                        items: {
                            [this.listId]: {
                                id: this.listId,
                                products: []
                            }
                        }
                    }
                }
            });
            this.store.dispatch(listActions.addNotExistProduct(this.listId, this.productId));
            expect(this.store.getActions()).to.be.deep.equal([
                {
                    type: listActions.ADD_PRODUCT,
                    payload: {
                        listId: this.listId,
                        product: {
                            id: this.productId,
                            amount: 1
                        }
                    }
                }
            ])
        });

        it('should create an notification action, if it is existed', function() {
            this.store = this.mockStore({
                lists: {
                    present: {
                        items: {
                            [this.listId]: {
                                id: this.listId,
                                products: [{
                                    id: this.productId,
                                    amount: 1
                                }]
                            }
                        }
                    }
                }
            });
            this.store.dispatch(listActions.addNotExistProduct(this.listId, this.productId));
            var actions = this.store.getActions();
            var expectedNotificationPayload = {
                id: actions[0].payload.id,
                type: 'warning',
                message: actions[0].payload.message
            };
            expect(actions).to.be.deep.equal([
                { type: notificationsActions.ADD_NOTIFICATION, payload: expectedNotificationPayload }
            ])
        })
    });


});
