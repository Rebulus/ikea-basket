import { expect } from 'chai';
import * as listActions from '../../../client/actions/list';

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

});
