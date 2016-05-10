import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


class ExercisesCollection extends Mongo.Collection {
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

export const Exercises = new ExercisesCollection('Exercises');

// Deny all client-side updates since we will be using methods to manage this collection
Exercises.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Exercises.schema = new SimpleSchema({
  lectionId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true,
  },
  name: {
    type: String,
    max: 100,
  },
  text: {
    type: String
  },
  points: {
    type: Number
  },
  order: {
  	type: Number
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  }
});

Exercises.attachSchema(Exercises.schema);

Exercises.helpers({
  // TODO
});