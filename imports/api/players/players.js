import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


class PlayersCollection extends Mongo.Collection {
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

export const Players = new PlayersCollection('Players');

// Deny all client-side updates since we will be using methods to manage this collection
Players.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Players.schema = new SimpleSchema({
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true
  },
  gameId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true
  },
  name: {
    type: String
  },
  skin: {
    type: String
  },
  wpm: {
    type: Number
  },
  completed: {
    type: Number
  },
  ready: {
    type: Boolean
  },
  finishedDate: {
    type: Date,
    optional: true
  },
  order: {
    type: Number,
    optional: true
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  },
});

Players.attachSchema(Players.schema);