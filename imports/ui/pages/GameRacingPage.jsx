import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Player from '../components/TouchType/Player.jsx';
import TrafficLightCountdown from '../components/TouchType/TrafficLightCountdown.jsx';
import TouchTypeGaming from '../components/TouchType/TouchTypeGaming.jsx';

import FlatButton from 'material-ui/FlatButton';
import ActionDone from 'material-ui/svg-icons/action/done';

import { createGame, updateGame } from '../../api/games/methods.js';
import { checkReady, uncheckReady, removePlayer } from '../../api/players/methods.js';


export default class GameRacingPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickReady = this.handleClickReady.bind(this);
    this.state = {timer: 10};
    this.started = false;
  }

  componentDidMount() {
    this.game = this.props.game;
    this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this));
  }

  routerWillLeave(nextLocation) {
    // remove player from game 
    const game = this.props.game;
    const gameId = game._id;
    removePlayer.call({gameId}, (err) => {
      if (err) {
      
        /* eslint-disable no-alert */
        alert('Could not remove player from game.');
      }
    });
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
      
        /* eslint-disable no-alert */
        alert('Could not check ready.');
      }
    });
  }
  
  render() {
    const players = this.props.players;
    const game = this.props.game;
    const countdown = this.state.timer;
    
    return (
      <div className="game-container">
        <div className="countdown">
          <TrafficLightCountdown countdown={countdown} />
        </div>
        <div className="game-cars">
          {players.map((player) => {
            return <Player player={player} key={player._id}/>;
          })}
        </div>
        <TouchTypeGaming text={game.text} countdown={countdown} />
        <div className="game-buttons">
          <FlatButton
            label="Som pripravený hrať"
            labelPosition="after"
            primary={true}
            icon={<ActionDone />}
            onClick={this.handleClickReady}
          />
        </div>
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
  route: React.PropTypes.object
};