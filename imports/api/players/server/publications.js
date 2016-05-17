/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Players } from '../players.js';

Meteor.publishComposite('players.inGame', function playersInGame(gameId) {
  new SimpleSchema({
    gameId: { type: String },
  }).validate({ gameId });


  return {
    find() {
      const query = {
        gameId
      };

      return Players.find(query);
    },
  };
});

Meteor.publish('players.all', function playersAll() {
  return Players.find();
});
