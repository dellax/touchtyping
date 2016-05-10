import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Lections } from './lections.js';

export const insert = new ValidatedMethod({
  name: 'lections.insert',
  validate: new SimpleSchema({
    name: { type: String },
    order: { type: Number }
  }).validator(),
  run({ name, order }) {

    const lection = {
      name,
      order,
      createdAt: new Date()
    };

    Lections.insert(lection);
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
