import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Player from '../components/TouchType/Player.jsx';
import TrafficLightCountdown from '../components/TouchType/TrafficLightCountdown.jsx';
import TouchTypeGaming from '../components/TouchType/TouchTypeGaming.jsx';

import { createGame, updateGame } from '../../api/games/methods.js';
import { checkReady, uncheckReady } from '../../api/players/methods.js';


// TODO zmazat po vylepseni
import Statistics from '../components/TouchType/Statistics.jsx';


export default class GameRacingPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickReady = this.handleClickReady.bind(this);
    this.state = {timer: 10};
    this.started = false;
    // TODO
    //const game = this.props.game;
    //if (game.hasStarted) {
      // START COUNTDOWN
    //}
    
  }

  componentWillReceiveProps(props) {
    const hasStarted = props.game.hasStarted;
    if (hasStarted && !this.started) {
      this.started = true;
      this.runTimer();
    }
  }

  tick() {
    this.setState({timer: this.state.timer -= 1});
    if (this.state.timer === 0) this.stopTimer();
  }

  runTimer() {
    this.timer = setInterval(this.tick.bind(this), 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  handleClickReady() {
    const game = this.props.game;
    const gameId = game._id;
    checkReady.call({gameId}, (err) => {
      if (err) {
        console.log(err);
      
        /* eslint-disable no-alert */
        alert('Could not check ready.');
      }
    });
  }
  
  render() {
    const players = this.props.players;
    const game = this.props.game;
    const countdown = this.state.timer;
    console.log(players);
    return (
      <div className="game-container">
        <div className="countdown">
          <TrafficLightCountdown countdown={countdown} />
        </div>
        <div className="game-cars">
          {players.map((player) => {
            return <div><Player player={player} />{player.completed}</div>
          })}
        </div>
        <TouchTypeGaming text={game.text} countdown={countdown} />
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