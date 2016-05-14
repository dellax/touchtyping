import React from 'react';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Sortable from 'react-anything-sortable';
import SortableItem from './SortableItem.jsx';

import { 
  updateExercise, 
  updateExerciseOrder, 
  removeExercise } from '../../api/exercises/methods.js';

export default class AdminLectionPage extends React.Component {
  constructor(props) {
    super(props);
    this._sortableKey = 0;
    this.state = {
      arr: props.lections
    };
  }

  componentWillReceiveProps(props) {
    this._sortableKey++;
    let lections = [...props.lections];
    this.setState({
      arr: lections
    });
  }

  handleSort(sortedArray) {
    this._sortableKey++;

    for (let i = 0; i < sortedArray.length; i++) {
      let exerciseId = sortedArray[i]._id;
      let order = i;
      updateExerciseOrder.call({exerciseId, order}, (err) => {
        if (err) {
        
          /* eslint-disable no-alert */
          alert('Could not update lection.');
        }
      });
    }
    this.setState({
      arr: sortedArray
    });
  }

  handleRemoveElement(index) {
    const newArr = this.state.arr.slice();
    const exerciseId = newArr[index]._id;
    newArr.splice(index, 1);
    this._sortableKey++;

    this.setState({
      arr: newArr
    });

    removeExercise.call({exerciseId}, (err) => {
      if (err) {
      
        /* eslint-disable no-alert */
        alert('Could not update lection.');
      }
    });
  }





  render() {
    
    function renderItem(data, index) {
      return (
        <SortableItem key={index} className="dynamic-item" sortData={data}>
          {data.name}
          <span className="delete"
            onMouseDown={this.handleRemoveElement.bind(this, index)}
          >&times;</span>
          <span className="delete"> upravit</span>
        </SortableItem>
      );
    }



    const lections = this.state.arr;
    
    if (lections.length === 0) {
      return (
        <div className="no-exercises">Zatial tu nie sú žiadne lekcie.</div>
      )
    }

    return (
      <div className="dynamic-demo">
        <Sortable key={this._sortableKey} onSort={this.handleSort.bind(this)}>
          {this.state.arr.map(renderItem, this)}
        </Sortable>
      </div>
    );
  }
}

