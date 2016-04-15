import { expect } from 'chai';
import * as listsActions from '../../../client/actions/lists';

describe('lists actions', function() {

    beforeEach(function () {
        this.listId = 'list-345';
        this.sinon.stub(listsActions.helpers, 'guid').returns(this.listId);
    });

    it('should create an action to add a list', function() {
        const expectedData = {
            type: listsActions.ADD_LIST,
            payload: {
                listId: this.listId
            }
        };

        expect(listsActions.addList()).to.be.deep.equal(expectedData);
    });

    it('should create an action to remove a list', function() {
        const expectedData = {
            type: listsActions.REMOVE_LIST,
            payload: {
                listId: this.listId
            }
        };

        expect(listsActions.removeList(this.listId)).to.be.deep.equal(expectedData);
    });

});
