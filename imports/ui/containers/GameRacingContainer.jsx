import { Meteor } from 'meteor/meteor';
import { Games } from '../../api/games/games.js';
import { createContainer } from 'meteor/react-meteor-data';
import GameRacingPage from '../pages/GameRacingPage.jsx';

export default createContainer(({ params: { id } }) => {
  // subcribe to players with id of game
  //const playersHandle = Meteor.subscribe('players.all');
  const gamesHandle = Meteor.subscribe('games.all');
  const playersHandle = Meteor.subscribe('players.inGame', id);
  const loading = !playersHandle.ready();
  const game = Games.findOne(id);
  const playerExists = !loading && !!game;

  return {
    loading,
    game,
    playerExists,
    players: playerExists ? game.players().fetch() : [],
  };
}, GameRacingPage);
