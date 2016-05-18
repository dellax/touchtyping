/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Models } from '../models.js';


Meteor.publish('models.all', function modelsAll() {
  return Models.find();
});