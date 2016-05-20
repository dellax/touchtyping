import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


class StatisticsCollection extends Mongo.Collection {
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

export const Statistics = new StatisticsCollection('Statistics');

// Deny all client-side updates since we will be using methods to manage this collection
Statistics.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Statistics.schema = new SimpleSchema({
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true
  },
  exerciseId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true
  },
  secondsElapsed: {
    type: Number
  },
  averageWpm: {
    type: Number
  },
  highestWpm: {
    type: Number
  },
  lettersTyped: {
    type: Number
  },
  wordsTyped: {
    type: Number
  },
  wpmList: {
    type: [Number]
  },
  incorrectWords: {
    type: [String]
  },
  incorrectLetters: {
    type: [String]
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  }
});

Statistics.attachSchema(Statistics.schema);

Statistics.helpers({
  
});