import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Statistics } from './statistics.js';

export const insert = new ValidatedMethod({
  name: 'statistics.insert',
  validate: new SimpleSchema({
    exerciseId: { type: String },
    averageWpm: { type: Number },
    wpmList: { type: [Number] },
    wrongWords: { type: [String] },
  }).validator(),
  run({ exerciseId, averageWpm, wpmList, wrongWords }) {

    const statistic = {
      userId = this.userId,
      exerciseId,
      averageWpm,
      wpmList,
      wrongWords
    };

    return Statistics.insert(statistic);
  },
});



// Get list of all method names on statistics
const STATISTICS_METHODS = _.pluck([
  insert
], 'name');

if (Meteor.isServer) {
  // Only allow 5 statistics operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(STATISTICS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
