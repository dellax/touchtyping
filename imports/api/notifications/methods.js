import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import moment from 'moment';

import { Notifications } from './notifications.js';

export const insertNotification = new ValidatedMethod({
  name: 'notifications.insertNotification',
  validate: new SimpleSchema({
    userId: { type: String },
    name: { type: String },
    text: { type: String }
  }).validator(),
  run({ userId, name, text }) {

    const notification = {
      userId,
      name,
      text,
      read: false,
      createdAt: new Date(),
    };

    const notificationId = Notifications.insert(notification);

    return notificationId;
  },
});

export const checkRead = new ValidatedMethod({
  name: 'notifications.checkRead',
  validate: new SimpleSchema({
    notificationId: { type: String },
  }).validator(),
  run({ notificationId }) {
    const notification = Notifications.findOne(notificationId);

    Notifications.update(notificationId, {
      $set: { 
        read: true,
      },
    });
  },
});

export const checkAllRead = new ValidatedMethod({
  name: 'notifications.checkAllRead',
  validate: new SimpleSchema({
    
  }).validator(),
  run({}) {
    const notifications = Notifications.find({userId: Meteor.userId()}).fetch();

    notifications.forEach((notification) => {
      Notifications.update(notification._id, {
        $set: { 
          read: true,
        },
      });
    });
    
  },
});



// Get list of all method names on notifications
const NOTIFICATIONS_METHODS = _.pluck([

], 'name');

if (Meteor.isServer) {
  // Only allow 5 notifications operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(NOTIFICATIONS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}