/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Statistics } from '../statistics.js';

Meteor.publish('statistics.all', function statisticsAll() {
  return Statistics.find();
});

// TODO publication for current user ...