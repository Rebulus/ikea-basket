import { expect } from 'chai';
import _ from 'lodash';
import deepFreeze from 'deep-freeze';
import listsReducer from '../../../client/reducers/lists';
import * as listActions from '../../../client/actions/list';
import * as listsActions from '../../../client/actions/lists';

describe('lists reducer', function() {

    beforeEach(function() {
        this.list1Id = 'list-1';
        this.list1 = {
            id: this.list1Id,
            name: 'NoName',
            products: []
        };
        this.list2Id = 'list-2';
        this.list2 = {
            id: this.list2Id,
            name: 'NoName',
            products: []
        };
        this.product1 = {
            id: 'product-1',
            amount: 1
        };
        this.product2 = {
            id: 'product-2',
            amount: 1
        };
        this.listGuid = this.sinon.stub(listsActions.helpers, 'guid');
    });
    
    describe('operation with list ->', function() {
        it('should add the first list', function() {
            const store = {};
            deepFreeze(store);

            this.listGuid.returns(this.list1Id);
            const expectedStore = {
                [this.list1Id]: this.list1
            };

            expect(listsReducer(store, listsActions.addList())).to.be.deep.equal(expectedStore);
        });
        
        it('should add the second list', function() {
            const store = {
                [this.list1Id]: this.list1
            };
            deepFreeze(store);

            this.listGuid.returns(this.list2Id);
            const expectedStore = {
                [this.list1Id]: this.list1,
                [this.list2Id]: this.list2
            };

            expect(listsReducer(store, listsActions.addList())).to.be.deep.equal(expectedStore);
        });

        it('should not replace the lists, when a new list added', function() {
            this.listGuid.restore();
            let store = {};
            deepFreeze(store);

            _.times(10, function() {
                store = listsReducer(store, listsActions.addList());
            });

            expect(_.keys(store)).to.be.length(10);
        });

        it('should remove the first list', function() {
            const store = {
                [this.list1Id]: this.list1,
                [this.list2Id]: this.list2
            };
            deepFreeze(store);
            const expectedStore = {
                [this.list2Id]: this.list2
            };

            expect(listsReducer(store, listsActions.removeList(this.list1Id))).to.be.deep.equal(expectedStore);
        });

        it('should remove the second list', function() {
            const store = {
                [this.list1Id]: this.list1,
                [this.list2Id]: this.list2
            };
            deepFreeze(store);
            const expectedStore = {
                [this.list1Id]: this.list1
            };

            expect(listsReducer(store, listsActions.removeList(this.list2Id))).to.be.deep.equal(expectedStore);
        });
        
        it('should remove the both lists', function() {
            const store = {
                [this.list1Id]: this.list1,
                [this.list2Id]: this.list2
            };
            deepFreeze(store);
            const expectedStore = {};
            
            let resultStore = listsReducer(store, listsActions.removeList(this.list1Id));
            deepFreeze(resultStore);
            resultStore = listsReducer(resultStore, listsActions.removeList(this.list2Id));

            expect(resultStore).to.be.deep.equal(expectedStore);
        });
    });

    describe('add a product in list ->', function() {
        it('should add the first product in list', function() {
            const store = {
                [this.list1Id]: this.list1,
                [this.list2Id]: this.list2
            };
            deepFreeze(store);
            const expectedStore = {
                [this.list1Id]: _.extend({}, this.list1, {
                    products: [
                        this.product1
                    ]
                }),
                [this.list2Id]: this.list2
            };

            expect(listsReducer(store, listActions.addProduct(this.list1Id, this.product1.id)))
                .to.be.deep.equal(expectedStore);
        });

        it('should add the second product in list', function() {
            const store = {
                [this.list1Id]: _.extend({}, this.list1, {
                    products: [this.product1]
                }),
                [this.list2Id]: this.list2
            };
            deepFreeze(store);
            const expectedStore = {
                [this.list1Id]: _.extend({}, this.list1, {
                    products: [
                        this.product1,
                        this.product2
                    ]
                }),
                [this.list2Id]: this.list2
            };

            expect(listsReducer(store, listActions.addProduct(this.list1Id, this.product2.id)))
                .to.be.deep.equal(expectedStore);
        });

        it('should add products in different lists', function() {
            const store = {
                [this.list1Id]: this.list1,
                [this.list2Id]: this.list2
            };
            deepFreeze(store);
            const expectedStore = {
                [this.list1Id]: _.extend({}, this.list1, {
                    products: [this.product1]
                }),
                [this.list2Id]: _.extend({}, this.list2, {
                    products: [this.product1]
                })
            };
            let resultStore = listsReducer(store, listActions.addProduct(this.list1Id, this.product1.id));
            deepFreeze(resultStore);
            resultStore = listsReducer(resultStore, listActions.addProduct(this.list2Id, this.product1.id));

            expect(resultStore).to.be.deep.equal(expectedStore);
        });
    });

    describe('change product\'s amount ->', function() {
        beforeEach(function() {
            this.store = {
                [this.list1Id]: _.extend({}, this.list1, {
                    products: [this.product1]
                }),
                [this.list2Id]: _.extend({}, this.list2, {
                    products: [this.product1]
                })
            };
            deepFreeze(this.store);
        });
        
        it('should change amount of a product in the first list', function() {
            const expectedStore = {
                [this.list1Id]: _.extend({}, this.list1, {
                    products: [
                        _.extend({}, this.product1, {
                            amount: 5
                        })
                    ]
                }),
                [this.list2Id]: _.extend({}, this.list2, {
                    products: [this.product1]
                })
            };

            expect(listsReducer(this.store, listActions.changeAmount(this.list1Id, this.product1.id, 5)))
                .to.be.deep.equal(expectedStore);
        });

        it('should change amount of a product in the second list', function() {
            const expectedStore = {
                [this.list1Id]: _.extend({}, this.list1, {
                    products: [this.product1]
                }),
                [this.list2Id]: _.extend({}, this.list2, {
                    products: [
                        _.extend({}, this.product1, {
                            amount: 3
                        })
                    ]
                })
            };

            expect(listsReducer(this.store, listActions.changeAmount(this.list2Id, this.product1.id, 3)))
                .to.be.deep.equal(expectedStore);
        });

        it('should change amount of products in the both lists', function() {
            const expectedStore = {
                [this.list1Id]: _.extend({}, this.list1, {
                    products: [
                        _.extend({}, this.product1, {
                            amount: 8
                        })
                    ]
                }),
                [this.list2Id]: _.extend({}, this.list2, {
                    products: [
                        _.extend({}, this.product1, {
                            amount: 4
                        })
                    ]
                })
            };
            let resultStore = listsReducer(this.store, listActions.changeAmount(this.list1Id, this.product1.id, 8));
            deepFreeze(resultStore);
            resultStore = listsReducer(resultStore, listActions.changeAmount(this.list2Id, this.product1.id, 4));

            expect(resultStore).to.be.deep.equal(expectedStore);
        });
    });

});
