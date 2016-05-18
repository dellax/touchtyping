import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


class ModelsCollection extends Mongo.Collection {
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

export const Models = new ModelsCollection('Models');

// Deny all client-side updates since we will be using methods to manage this collection
Models.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Models.schema = new SimpleSchema({
  name: {
    type: String,
    max: 100,
  },
  image: {
    type: String,
    optional: true
  },
  points: {
    type: Number
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  }
});

Models.attachSchema(Models.schema);

Models.helpers({
  // TODO
});