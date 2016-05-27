import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import GameRacingPage from '../pages/GameRacingPage.jsx';
import { Games } from '../../api/games/games.js';
import { Texts } from '../../api/texts/texts.js';

export default createContainer(({ params: { id } }) => {
  const playersHandle = Meteor.subscribe('players.inGame', id);
  const loading = !playersHandle.ready();
  const game = Games.findOne(id);
  const playerExists = !loading && !!game;

  return {
    id,
    loading,
    game,
    text: Texts.findOne(game.textId),
    playerExists,
    players: playerExists ? game.players().fetch() : [],
  };
}, GameRacingPage);
