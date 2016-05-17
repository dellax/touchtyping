import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Games } from './games.js';
import { Players } from '../players/players.js';

export const createGame = new ValidatedMethod({
  name: 'games.createGame',
  validate: new SimpleSchema({
    type: { type: String }
  }).validator(),
  run({ type }) {

    const game = {
      type,
      text: 'Cvicny text je cvicny text',
      isRunning: false,
      createdAt: new Date(),
      playersCount: 1
    };

    const user =  Meteor.user();
    const gameId = Games.insert(game);
    // TODO check if game didnt contain player
    const player = {
      userId: user._id,
      gameId,
      name: user.username,
      skin: 0,
      wpm: 0,
      completed: 0,
      createdAt: new Date()
    };

    return gameId;
  },
});

export const updateGame = new ValidatedMethod({
  name: 'games.updateGame',
  validate: new SimpleSchema({
    gameId: { type: String },
  }).validator(),
  run({ gameId }) {
    const game = Games.findOne(gameId);
    // add player
    let playersCount = game.playersCount + 1;
    let isRunning = false;
    if (playersCount === 4) isRunning = true;
    Games.update(gameId, {
      $set: { 
        playersCount,
        isRunning
      },
    });

  },
});

// Get list of all method names on games
const GAMES_METHODS = _.pluck([
  createGame
], 'name');

if (Meteor.isServer) {
  // Only allow 5 games operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(GAMES_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}