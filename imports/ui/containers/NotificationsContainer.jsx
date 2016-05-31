import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import NotificationsPage from '../pages/NotificationsPage.jsx';
import { Notifications } from '../../api/notifications/notifications.js';

export default createContainer(() => {
  const user = Meteor.user();
  const notifications = Notifications.find({ userId: user._id }, { sort: { createdAt: -1 } }).fetch();
  return {
  	notifications
  };
}, NotificationsPage);