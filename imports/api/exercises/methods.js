import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Exercises } from './exercises.js';

export const insert = new ValidatedMethod({
  name: 'exercises.insert',
  validate: new SimpleSchema({
    lectionId: { type: String },
    name: { type: String },
    text: { type: String },
    points: { type: Number }
  }).validator(),
  run({ lectionId, name, text, points }) {

    const exercise = {
      lectionId,
      name,
      text,
      points,
      createdAt: new Date()
    };

    Exercises.insert(exercise);
  },
});

// Get list of all method names on exercises
const EXERCISES_METHODS = _.pluck([
  insert
], 'name');

if (Meteor.isServer) {
  // Only allow 5 exercise operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(EXERCISES_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}