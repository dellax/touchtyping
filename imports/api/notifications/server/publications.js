/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Notifications } from '../notifications.js';

Meteor.publish('notifications.all', function notificationsAll() {
  return Notifications.find();
});

Meteor.publishComposite('notifications.forUser', function notificationsForUser(userId) {
  new SimpleSchema({
    userId: { type: String },
  }).validate({ userId });


  return {
    find() {
      const query = {
        userId
      };

      return Notifications.find(query);
    },
  };
});