/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Lections } from '../lections.js';

Meteor.publish('lections.all', function lectionsAll() {
  return Lections.find();
});