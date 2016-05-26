import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Statistics } from './statistics.js';

export const insertStatistic = new ValidatedMethod({
  name: 'statistics.insert',
  validate: new SimpleSchema({
    exerciseId: { type: String },
    secondsElapsed: { type: Number },
    averageWpm: { type: Number },
    highestWpm: { type: Number },
    lettersTyped: { type: Number },
    wordsTyped: { type: Number },
    wpmList: { type: [Number] },
    incorrectWords: { type: [String] },
    incorrectLetters: { type: [String] },
  }).validator(),
  run({ 
    exerciseId,
    secondsElapsed,
    averageWpm,
    highestWpm,
    lettersTyped,
    wordsTyped,
    wpmList,
    incorrectWords,
    incorrectLetters }) {

    //if (!this.userId) return;
     
    const statistic = {
      userId: this.userId,
      exerciseId,
      secondsElapsed,
      averageWpm,
      highestWpm,
      lettersTyped,
      wordsTyped,
      wpmList,
      incorrectWords,
      incorrectLetters,
    };

    return Statistics.insert(statistic);
  },
});



// Get list of all method names on statistics
const STATISTICS_METHODS = _.pluck([
  insertStatistic
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
