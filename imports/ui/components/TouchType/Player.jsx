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
            <img width="88" height="47" title="" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAAAvCAYAAABnsg1NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDYxRkI3ODgxQUI2MTFFNkFFNzlFQUJFQTU0OTgyRUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDYxRkI3ODkxQUI2MTFFNkFFNzlFQUJFQTU0OTgyRUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNjFGQjc4NjFBQjYxMUU2QUU3OUVBQkVBNTQ5ODJFRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNjFGQjc4NzFBQjYxMUU2QUU3OUVBQkVBNTQ5ODJFRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PktYCwYAABEQSURBVHja7FtrbGXX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" />
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
