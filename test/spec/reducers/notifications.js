import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import notificationsReducer from '../../../client/reducers/notifications';
import * as notificationsActions from '../../../client/actions/notifications';

describe('notifications reducer', function() {

    beforeEach(function() {
        this.notification1Id = 'notification-1';
        this.notification2Id = 'notification-2';
        this.sinon.stub(notificationsActions.helpers, 'guid').returns(this.notification1Id);
    });

    it('should add the first notification to the notifications list', function() {
        const store = [];
        deepFreeze(store);
        const expectedStore = [{
            id: this.notification1Id,
            type: 'warning',
            message: 'test'
        }];

        expect(notificationsReducer(store, notificationsActions.addNotification('warning', 'test')))
            .to.be.deep.equal(expectedStore);
    });

    it('should add the second notification to the notifications list', function() {
        notificationsActions.helpers.guid.returns(this.notification2Id);

        const store = [{
            id: this.notification1Id,
            type: 'warning',
            message: 'test'
        }];
        deepFreeze(store);
        const expectedStore = [{
            id: this.notification1Id,
            type: 'warning',
            message: 'test'
        }, {
            id: this.notification2Id,
            type: 'danger',
            message: 'test2'
        }];

        expect(notificationsReducer(store, notificationsActions.addNotification('danger', 'test2')))
            .to.be.deep.equal(expectedStore);
    });

    it('should remove the first notification from the notifications list', function() {
        const store = [{
            id: this.notification1Id,
            type: 'warning',
            message: 'test'
        }, {
            id: this.notification2Id,
            type: 'danger',
            message: 'test2'
        }];
        deepFreeze(store);
        const expectedStore = [{
            id: this.notification2Id,
            type: 'danger',
            message: 'test2'
        }];

        expect(notificationsReducer(store, notificationsActions.removeNotification(this.notification1Id)))
            .to.be.deep.equal(expectedStore);
    });

    it('should remove all notification from the notifications list', function() {
        const store = [{
            id: this.notification1Id,
            type: 'warning',
            message: 'test'
        }, {
            id: this.notification2Id,
            type: 'danger',
            message: 'test2'
        }];
        deepFreeze(store);
        const expectedStore = [];

        expect(notificationsReducer(store, notificationsActions.removeAllNotifications()))
            .to.be.deep.equal(expectedStore);
    });

});