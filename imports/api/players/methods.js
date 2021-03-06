import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Players } from './players.js';
import { defaultSkin } from './skins.js'
import { Games } from '../games/games.js';
import { Models } from '../models/models.js';

export const insertPlayer = new ValidatedMethod({
  name: 'players.insertPlayer',
  validate: new SimpleSchema({
    gameId: { type: String },
  }).validator(),
  run({ gameId }) {
    const user =  Meteor.user();
    let skin = defaultSkin;
    const modelId = user.defaultModel;
    if (modelId) {
      const model = Models.findOne(modelId);
      skin = model.image;
    }
    // TODO check if game didnt contain player
    const player = {
      userId: Meteor.userId(),
      gameId,
      name: user.username,
      skin,
      points: user.pointsGames,
      wpm: 0,
      completed: 0,
      ready: false,
      finishedDate: null,
      order: null,
      createdAt: new Date()
    };

    return Players.insert(player);
  },
});

export const updatePlayer = new ValidatedMethod({
  name: 'players.updatePlayer',
  validate: new SimpleSchema({
    playerId: { type: String },
    completed: { type: Number },
    wpm: { type: Number }
  }).validator(),
  run({ playerId, completed, wpm }) {
    let finishedDate = null;
    if (completed === 100) finishedDate = new Date();
    Players.update(playerId, {
      $set: { completed, wpm , finishedDate }
    });
    if (completed === 100) {
      // reset players order
      const player = Players.findOne(playerId);
      const gameId = player.gameId;
      const playersInGame = Players.find({ 
        gameId, 
        finishedDate: { $ne: null }
      }, { sort: { finishedDate: 1 } } ).fetch();
      // set order of players with finishedDate field
      for (let i = 0; i < playersInGame.length; i++) {
        const currentPlayer = playersInGame[i];
        Players.update(currentPlayer._id, {
          $set: { order: i+1 }
        });
      }
    }
  },
});

export const checkReady = new ValidatedMethod({
  name: 'players.checkReady',
  validate: new SimpleSchema({
    gameId: { type: String }
  }).validator(),
  run({ gameId }) {
    const userId = Meteor.userId();
    const playerId = Players.findOne({userId, gameId});
    Players.update(playerId, {
      $set: { ready: true },
    });
    const game = Games.findOne(gameId);
    if (game.playersCount < 2) return; 
    if (game.arePlayersReady()) {
      Games.update(gameId, {
        $set: { hasStarted: true },
      });
    }
    // TODO check if all players are ready
  },
});

export const unCheckRead = new ValidatedMethod({
  name: 'players.unCheckRead',
  validate: new SimpleSchema({
    gameId: { type: String }
  }).validator(),
  run({ gameId }) {
    const userId = Meteor.userId();
    const playerId = Players.findOne({userId, gameId});
    return Players.update(playerId, {
      $set: { ready: false },
    });
  },
});

export const removePlayer = new ValidatedMethod({
  name: 'players.removePlayer',
  validate: new SimpleSchema({
    gameId: { type: String }
  }).validator(),
  run({ gameId }) {
    const game = Games.findOne(gameId);
    if (game.hasStarted) return;
    const userId = Meteor.userId();
    const playerId = Players.findOne({userId, gameId});
    Games.update(gameId, {
      $inc: { playersCount: -1 }
    });
    return Players.remove(playerId);
  },
});



// Get list of all method names on players
const PLAYER_METHODS = _.pluck([
  
], 'name');

if (Meteor.isServer) {
  // Only allow 5 lection operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(PLAYER_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
