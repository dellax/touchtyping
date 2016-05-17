import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Player from '../components/TouchType/Player.jsx';

import { createGame, updateGame } from '../../api/games/methods.js';


// TODO zmazat po vylepseni
import Statistics from '../components/TouchType/Statistics.jsx';


export default class GameRacingPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickReady = this.handleClickReady.bind(this);

    // TODO
    //const game = this.props.game;
    //if (game.hasStarted) {
      // START COUNTDOWN
    //}
    
  }

  handleClickReady() {
    
  }
  
  render() {
    
    
    return (
      <div className="game-container">
        <div className="game-cars">
          <Player completed={10} />
          <Player completed={10} />
          <Player completed={10} />
        </div>
        <span onClick={this.handleClickReady}>Som pripraveny</span>
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