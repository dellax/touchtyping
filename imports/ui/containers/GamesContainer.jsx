import { Meteor } from 'meteor/meteor';
import { Games } from '../../api/games/games.js';
import { createContainer } from 'meteor/react-meteor-data';
import GamesPage from '../pages/GamesPage.jsx';

export default createContainer(() => {
  const gamesHandle = Meteor.subscribe('games.all');
  const loading = !gamesHandle.ready();

  return {
    loading,
    games: Games.find({isRunning: false}).fetch(),
  };
}, GamesPage);
