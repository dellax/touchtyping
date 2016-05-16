import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import { Tabbordion, Panel } from 'react-tabbordion';
import TouchTypeLearning from '../components/TouchType/TouchTypeLearning.jsx';
import { Session } from 'meteor/session';

// TODO zmazat po vylepseni
import Statistics from '../components/TouchType/Statistics.jsx';


export default class ListPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickRacingGame = this.handleClickRacingGame.bind(this);
  }

  handleClickRacingGame() {
    const games = this.props.games;
    const gamesCount = games.length;
    if (gamesCount === 0) {
      // TODO
      // create new Game and join
    }
  }
  
  render() {
    
    
    return (
      <div className="games-container">
        <span onClick={this.handleClickRacingGame}>Pripojit sa ku hre</span>
      </div>
    );
  }
}

ListPage.propTypes = {
  games: React.PropTypes.array,
  loading: React.PropTypes.bool,
};
