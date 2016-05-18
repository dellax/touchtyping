import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Models } from './models.js';

export const insertModel = new ValidatedMethod({
  name: 'models.insertModel',
  validate: new SimpleSchema({
    
  }).validator(),
  run({}) {
    // TODO add default image base64
    const model = {
      name: 'Nový model',
      image: '',
      points: 1000,
      createdAt: new Date()
    };

    return Models.insert(model);
  },
});

export const updateModel = new ValidatedMethod({
  name: 'models.updateModel',
  validate: new SimpleSchema({
    modelId: { type: String },
    name: { type: String },
    image: { type: String },
    points: { type: Number }
  }).validator(),
  run({ modelId, name, image, points }) {

    Models.update(modelId, {
      $set: { name, image, points}
    });

  },
});

export const removeModel = new ValidatedMethod({
  name: 'models.removeModel',
  validate: new SimpleSchema({
    modelId: { type: String }
  }).validator(),
  run({ modelId }) {

    Models.remove(modelId);

  },
});



// Get list of all method names on models
const MODELS_METHOD = _.pluck([
  insertModel
], 'name');

if (Meteor.isServer) {
  // Only allow 5 exercise operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(MODELS_METHOD, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}