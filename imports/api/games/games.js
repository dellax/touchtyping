import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Players } from '../players/players.js';


class GamesCollection extends Mongo.Collection {
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

export const Games = new GamesCollection('Games');

// Deny all client-side updates since we will be using methods to manage this collection
Games.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Games.schema = new SimpleSchema({
  type: {
    type: String,
    max: 100,
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  },
  textId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true,
  },
  timer: {
    type: Number
  },
  hasStarted: {
    type: Boolean
  },
  isFull: {
    type: Boolean
  },
  playersCount: {
    type: Number
  }
});

Games.attachSchema(Games.schema);

Games.helpers({
  players() {
    return Players.find({ gameId: this._id }, { sort: { createdAt: 1 } });
  },
  playersByTime() {
    return Players.find({ gameId: this._id }, { sort: { finishedDate: -1 } });
  },
  arePlayersReady() {
    const allPlayersCount = Players.find({ gameId: this._id }).count();
    const readyPlayersCount = Players.find({ gameId: this._id, ready: true }).count();
    if (allPlayersCount === readyPlayersCount) return true;
    return false;
  }
});