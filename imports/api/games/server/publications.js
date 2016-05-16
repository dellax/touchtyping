/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Games } from '../games.js';

Meteor.publish('games.all', function gamesAll() {
  return Games.find();
});