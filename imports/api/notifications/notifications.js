import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Players } from '../players/players.js';


class NotificationsCollection extends Mongo.Collection {
  insert(doc, callback) {
    const ourDoc = doc;
    ourDoc.createdAt = ourDoc.createdAt || new Date();
    const result = super.insert(ourDoc, callback);
    return result;
  }
  update(selector, modifier) {
    const result = super.update(selector, modifier);
    return result;
  }
  remove(selector) {
    const todos = this.find(selector).fetch();
    const result = super.remove(selector);
    return result;
  }
}

export const Notifications = new NotificationsCollection('Notifications');

// Deny all client-side updates since we will be using methods to manage this collection
Notifications.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Notifications.schema = new SimpleSchema({
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true
  },
  name: {
    type: String,
    max: 100,
  },
  text: {
    type: String,
    max: 100,
  },
  read: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  }
});

Notifications.attachSchema(Notifications.schema);

Notifications.helpers({
  
});