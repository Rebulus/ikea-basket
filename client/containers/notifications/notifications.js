import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import _ from 'lodash';
import { removeNotification, removeAllNotifications } from '../../actions/notifications';

const NOTIFICATION_SHOW_TIME = 5000; // 5s

class Notification extends React.Component {
    constructor() {
        super();
        this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    }

    componentDidMount() {
        this.timer = setTimeout(() => this.handleClose(), NOTIFICATION_SHOW_TIME);
        this.startAnimationTimer = _.defer(() => this.refs.notification.classList.add('alert-show'));
    }

    componentWillUnmount() {
        this.resetShowState();
    }

    handleClose() {
        const notification = this.refs.notification;
        notification.classList.remove('alert-show');
        notification.classList.add('alert-hide');
        notification.addEventListener('transitionend', this.handleTransitionEnd);
    }

    handleTransitionEnd() {
        this.remove();
    }

    resetShowState() {
        clearTimeout(this.timer);
        clearTimeout(this.startAnimationTimer);
        this.refs.notification.removeEventListener('transitionend', this.handleTransitionEnd);
    }

    remove() {
        this.resetShowState();
        this.props.onClose();
    }

    render() {
        let closeAllButton = null;
        if (this.props.hasCloseAllButton) {
            closeAllButton = (
                <button className="btn btn-default"
                    onClick={() => this.props.onCloseAll()}>
                    Close all
                </button>
            )
        }
        return (
            <div ref="notification" className={classNames('alert', `alert-${this.props.type}`)}
                onClick={() => this.handleClose()}>
                {this.props.message}
                {closeAllButton}
            </div>
        )
    }
}

const Notifications = (props) => {
    const hasCloseAllButton = props.notifications && props.notifications.length > 1;
    return (
        <div className="notifications">
            {
                _.map(props.notifications, (notification) => (
                    <Notification {...notification} key={notification.id} hasCloseAllButton={hasCloseAllButton}
                        onClose={() => props.removeNotification(notification.id)}
                        onCloseAll={() => props.removeAllNotifications()}/>
                ))
            }
        </div>
    )
};

export default connect(
    state => state,
    {
        removeNotification,
        removeAllNotifications
    }
)(Notifications);