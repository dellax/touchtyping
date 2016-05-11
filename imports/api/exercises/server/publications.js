/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Exercises } from '../exercises.js';
import { Lections } from '../../lections/lections.js';

Meteor.publishComposite('exercises.inLection', function exercisesInLection(lectionId) {
  new SimpleSchema({
    lectionId: { type: String },
  }).validate({ lectionId });

  return {
    find() {
      const query = {
        _id: lectionId
      };

      // We need _id and name field in this query
      const options = {
        fields: { _id: 1, name: 1 },
      };

      return Lections.find(query);
    },

    children: [{
      find(lection) {
        return Exercises.find({ lectionId: lection._id });
      },
    }],
  };
});

Meteor.publish('exercises.all', function exercisesAll() {
  return Exercises.find();
});