import { expect } from 'chai';
import * as notificationsActions from '../../../client/actions/notifications';

describe('notifications actions', function() {

    beforeEach(function () {
        this.notificationId = 'notification-123';
        this.sinon.stub(notificationsActions.helpers, 'guid').returns(this.notificationId);
    });

    it('should create an action to add a notification', function() {
        const expectedData = {
            type: notificationsActions.ADD_NOTIFICATION,
            payload: {
                id: this.notificationId,
                type: 'danger',
                message: 'some error'
            }
        };

        expect(notificationsActions.addNotification('danger', 'some error')).to.be.deep.equal(expectedData);
    });

    it('should create an action to remove a notification', function() {
        const expectedData = {
            type: notificationsActions.REMOVE_NOTIFICATION,
            payload: {
                id: this.notificationId
            }
        };

        expect(notificationsActions.removeNotification(this.notificationId)).to.be.deep.equal(expectedData);
    });

    it('should create an action to remove all notifications', function() {
        const expectedData = {
            type: notificationsActions.REMOVE_ALL_NOTIFICATIONS,
            payload: {}
        };

        expect(notificationsActions.removeAllNotifications()).to.be.deep.equal(expectedData);
    });

});
