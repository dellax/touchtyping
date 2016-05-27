import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Texts } from './texts.js';

export const insertText = new ValidatedMethod({
  name: 'texts.insertText',
  validate: new SimpleSchema({
    name: { type: String },
    text: { type: String }
  }).validator(),
  run({ name, text }) {

    const text = {
      name,
      text,
      createdAt: new Date()
    };

    return Texts.insert(text);
  },
});

export const updateText = new ValidatedMethod({
  name: 'texts.updateText',
  validate: new SimpleSchema({
    textId: { type: String },
    name: { type: String },
    text: { type: String }
  }).validator(),
  run({ textId, name, text }) {

    Texts.update(textId, {
      $set: { name, text }
    });

  },
});

export const removeText = new ValidatedMethod({
  name: 'texts.removeText',
  validate: new SimpleSchema({
    textId: { type: String }
  }).validator(),
  run({ textId }) {

    Texts.remove(textId);

  },
});



// Get list of all method names on texts
const TEXTS_METHODS = _.pluck([
  insertText
], 'name');

if (Meteor.isServer) {
  // Only allow 5 exercise operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(TEXTS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}