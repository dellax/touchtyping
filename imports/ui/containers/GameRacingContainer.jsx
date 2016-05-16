import { Meteor } from 'meteor/meteor';
import { Games } from '../../api/games/games.js';
import { createContainer } from 'meteor/react-meteor-data';
import GameRacingPage from '../pages/GameRacingPage.jsx';

export default createContainer(({ params: { id } }) => {
  const gamesHandle = Meteor.subscribe('games.all', id);
  const loading = !gamesHandle.ready();
  const lection = Lections.findOne(id);
  const lectionExists = !loading && !!lection;

  return {
    loading,
    lection,
    lectionExists,
    exercises: lectionExists ? lection.exercises().fetch() : [],
  };
}, GameRacingPage);
