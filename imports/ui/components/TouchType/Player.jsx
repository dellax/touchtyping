import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Move from '../../../plugins/move.min.js';

Move.select = function(selector){
  return selector;
};

export default class Car extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.car = ReactDOM.findDOMNode(this.refs.car);
  }

  componentDidUpdate() {
    const completed = this.props.player.completed;
    this.moveCar(completed);
  }

  moveCar(completed) {
    const distance = completed * 7;
    console.log(completed);
    Move(this.car)
      .x(distance)
      .end();
  }

  render() {
    const player = this.props.player;
    const playerStyles = {
      color: 'red'
    }
    if (player.ready) playerStyles.color = 'green';
    let order;
    if (player.order) {
      order = player.order;
      // TODO add images for 1,2,3 th place
    } else {
      order = 'Neskončil';
    }
    return (
      <div className="player">
        <div className="road">
          <div className="car" ref="car">
            <img width="88" height="47" title="" alt={player.name} src={player.skin} />
          </div>
        </div>
        <div className="info"> 
          <span style={playerStyles}>{player.name}</span><br/>
          { player.wpm } WPM<br/>
          { order }

        </div>
      </div>
    )
  }
}
