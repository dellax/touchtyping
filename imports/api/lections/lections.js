import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Exercises } from '../exercises/exercises.js';


class LectionsCollection extends Mongo.Collection {
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

export const Lections = new LectionsCollection('Lections');

// Deny all client-side updates since we will be using methods to manage this collection
Lections.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Lections.schema = new SimpleSchema({
  name: {
    type: String,
    max: 100,
  },
  order: {
  	type: Number
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  }
});

Lections.attachSchema(Lections.schema);

Lections.helpers({
  exercises() {
    return Exercises.find({ lectionId: this._id }, { sort: { order: 1 } });
  }
});