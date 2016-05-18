import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Games } from '../../api/games/games.js';
import GamesPage from '../pages/GamesPage.jsx';

export default createContainer(() => {
  const gamesHandle = Meteor.subscribe('games.all');
  //const playersHandle = Meteor.subscribe('players.all');
  const loading = !gamesHandle.ready();

  return {
    loading,
    games: Games.find({ hasStarted: false, isFull: false }, { sort: { playersCount: -1 } }).fetch(),
  };
}, GamesPage);
