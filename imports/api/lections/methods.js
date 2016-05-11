import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Lections } from './lections.js';

export const insert = new ValidatedMethod({
  name: 'lections.insert',
  validate: new SimpleSchema({
    // name: { type: String },
    // order: { type: Number }
  }).validator(),
  run({}) {

    const lection = {
      name: 'Nová lekcia',
      order: 0
    };

    // return id, so we can navigate to update lection
    return Lections.insert(lection);
  },
});

export const updateLection = new ValidatedMethod({
  name: 'lections.updateLection',
  validate: new SimpleSchema({
    lectionId: { type: String },
    name: { type: String },
  }).validator(),
  run({ lectionId, name }) {

    Lections.update(lectionId, {
      $set: { name: name },
    });

  },
});

// Get list of all method names on lections
const LECTIONS_METHODS = _.pluck([
  insert
], 'name');

if (Meteor.isServer) {
  // Only allow 5 lection operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(LECTIONS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
