import React from 'react';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Sortable from 'react-anything-sortable';
import ExerciseItem from '../components/ExerciseItem.jsx';


export default class ListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [998, 225, 13]
    };
    this._sortableKey = 0;
  }

  handleSort(sortedArray) {
    this._sortableKey++;
    this.setState({
      arr: sortedArray
    });
  }

  handleAddElement() {
    this._sortableKey++;
    this.setState({
      arr: this.state.arr.concat(Math.round(Math.random() * 1000))
    });
  }

  handleRemoveElement(index) {
    const newArr = this.state.arr.slice();
    newArr.splice(index, 1);
    this._sortableKey++;

    this.setState({
      arr: newArr
    });
  }

  

  render() {
    function renderItem(num, index) {
      return (
        <ExerciseItem key={index} className="dynamic-item" sortData={num}>
          {num}
          <span className="delete"
            onMouseDown={this.handleRemoveElement.bind(this, index)}
          >&times;</span>
        </ExerciseItem>
      );
    }


    return (
      <div className="container">
        <h2>Pridať novú lekciu</h2>
        <label for="name">Názov lekcie:</label>
        <input type="text" name="name" ref="name" placeholder=""/>
        <h5>Zoznam cviceni k lekcii</h5>

        <div className="dynamic-demo">
          <button onClick={this.handleAddElement.bind(this)}>Pridať cvičenie</button>
          <Sortable key={this._sortableKey} onSort={this.handleSort.bind(this)}>
            {this.state.arr.map(renderItem, this)}
          </Sortable>
        </div>
      </div>
    );
  }
}