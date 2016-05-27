import { Meteor } from 'meteor/meteor';
// XXX: Session
import { Session } from 'meteor/session';
import { Lections } from '../../api/lections/lections.js';
import { Notifications } from '../../api/notifications/notifications.js';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../layouts/App.jsx';

export default createContainer(() => {
  const textsHandle = Meteor.subscribe('texts.all');
  const notificationsPrivateHandle = Meteor.subscribe('notifications.private');
  const statisticsHandle = Meteor.subscribe('statistics.all');
	const usersHandle = Meteor.subscribe('users.data');
	const modelsHandle = Meteor.subscribe('models.all');
	const gamesHandle = Meteor.subscribe('games.all');
  const lectionsHandle = Meteor.subscribe('lections.all');
  const exercisesHandle = Meteor.subscribe('exercises.all');
  return {
    user: Meteor.user(),
    loading: !(modelsHandle.ready() 
      && gamesHandle.ready() 
      && lectionsHandle.ready() 
      && exercisesHandle.ready() 
      && usersHandle.ready() 
      && statisticsHandle.ready()
      && notificationsPrivateHandle.ready()
      && textsHandle.ready()),
    connected: Meteor.status().connected,
    newNotificationsCount: Notifications.find(
      { userId: Meteor.userId(), read: false }).count(),
    notifications: Notifications.find(
      { userId: Meteor.userId() },
      { sort: { createdAt: -1}, limit: 5 }).fetch()
  };
}, App);
