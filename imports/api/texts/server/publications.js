/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Texts } from '../texts.js';

Meteor.publish('texts.all', function textsAll() {
  return Texts.find();
});