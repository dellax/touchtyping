import React from 'react';
import { Session } from 'meteor/session';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';

import { createGame, updateGame } from '../../api/games/methods.js';
import { insertPlayer } from '../../api/players/methods.js';

// TODO zmazat po vylepseni
import Statistics from '../components/TouchType/Statistics.jsx';


export default class GamesPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickRacingGame = this.handleClickRacingGame.bind(this);
    this.newPlayer = this.newPlayer.bind(this);
  }

  handleClickRacingGame() {
    const { router } = this.context;
    const games = this.props.games;
    const gamesCount = games.length;
    if (gamesCount === 0) {
      const gameId = createGame.call({ type: "racing" }, (err) => {
        if (err) {
          router.push('/');
          /* eslint-disable no-alert */
          alert('Could not create game.');
        }
      });

      const playerId = insertPlayer.call({ gameId }, (err) => {
        if (err) {
          console.log(err);
          router.push('/');
          /* eslint-disable no-alert */
          alert('Could not create player.');
        }
      });
      Session.set('playerId', playerId);
      return router.push(`/hra/zavody/id/${gameId}`);
    } else {
      // find game... with lowest players

      // update players count in game
      const gameId = games[0]._id;
      updateGame.call({gameId}, (err) => {
        if (err) {
          router.push('/');
          /* eslint-disable no-alert */
          alert('Could not join game.');
        }
      });

      const playerId = insertPlayer.call({ gameId }, (err) => {
        if (err) {
          router.push('/');
          /* eslint-disable no-alert */
          alert('Could not create player.');
        }
      });
      Session.set('playerId', playerId);
      // redirect to found game
      router.push(`/hra/zavody/id/${gameId}`);
    }
  }

  newPlayer() {
    const { router } = this.context;
    let gameId = "iM5Kwx7q8oWkcPHN4";
    const playerId = insertPlayer.call({ gameId }, (err) => {
        if (err) {
          console.log(err);
          router.push('/');
          /* eslint-disable no-alert */
          alert('Could not create player.');
        }
      });
  }
  
  render() {
    
    
    return (
      <div className="games-container">
        <span onClick={this.handleClickRacingGame}>Pripojit sa ku hre</span>
        <span onClick={this.newPlayer}>vytvorit playera </span>
      </div>
    );
  }
}

GamesPage.propTypes = {
  games: React.PropTypes.array,
  loading: React.PropTypes.bool,
};

GamesPage.contextTypes = {
  router: React.PropTypes.object,
};