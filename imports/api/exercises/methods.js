import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Exercises } from './exercises.js';

export const insertExercise = new ValidatedMethod({
  name: 'exercises.insertExercise',
  validate: new SimpleSchema({
    lectionId: { type: String },
    order: { type: Number }
  }).validator(),
  run({ lectionId, order }) {

    const exercise = {
      lectionId,
      name: 'Nové cvičenie',
      text: 'dd',
      points: 0,
      order,
      createdAt: new Date()
    };

    return Exercises.insert(exercise);
  },
});

export const updateExerciseOrder = new ValidatedMethod({
  name: 'exercises.updateExerciseOrder',
  validate: new SimpleSchema({
    exerciseId: { type: String },
    order: { type: Number },
  }).validator(),
  run({ exerciseId, order }) {

    Exercises.update(exerciseId, {
      $set: { order: order },
    });

  },
});

export const updateExercise = new ValidatedMethod({
  name: 'exercises.updateExercise',
  validate: new SimpleSchema({
    exerciseId: { type: String },
    name: { type: String },
    text: { type: String },
    points: { type: Number }
  }).validator(),
  run({ exerciseId, name, text, points }) {

    Exercises.update(exerciseId, {
      $set: { name, text, points}
    });

  },
});

export const removeExercise = new ValidatedMethod({
  name: 'exercises.removeExercise',
  validate: new SimpleSchema({
    exerciseId: { type: String }
  }).validator(),
  run({ exerciseId }) {

    Exercises.remove(exerciseId);

  },
});



// Get list of all method names on exercises
const EXERCISES_METHODS = _.pluck([
  insertExercise
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