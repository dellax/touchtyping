import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';

import { createGame, updateGame } from '../../api/games/methods.js';


// TODO zmazat po vylepseni
import Statistics from '../components/TouchType/Statistics.jsx';


export default class GameRacingPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickRacingGame = this.handleClickRacingGame.bind(this);
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

      // redirect to found game
      router.push(`/hry/zavody/id/${gameId}`);
    }
  }
  
  render() {
    
    
    return (
      <div className="game-container">
        sadfsdfsfsfdsfd
        <span onClick={this.handleClickRacingGame}>Pripojit sa ku hre</span>
      </div>
    );
  }
}

GameRacingPage.propTypes = {
  games: React.PropTypes.array,
  loading: React.PropTypes.bool,
};

GameRacingPage.contextTypes = {
  router: React.PropTypes.object,
};