import React from 'react';
import Modal from 'boron/DropModal';
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
    
    this.state = {
      arr: props.exercises,
      formExerciseData: {
        _id: '',
        name: '',
        text: '',
        points: 0
      }
    };
    this._sortableKey = 0;
  }

  componentWillReceiveProps(props) {
    this._sortableKey++;
    let exercises = [...props.exercises];
    this.setState({
      arr: exercises
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
          alert('Could not update exercise.');
        }
      });
    }
    this.setState({
      arr: sortedArray
    });
  }

  handleUpdateElement(index) {
    this._sortableKey++;
    let data = this.state.arr.slice();
    this.clickedExerciseIndex = index;
    let clickedExerciseData = {...data[index]};
    this.setState({formExerciseData: clickedExerciseData});
    
    this.showModal();
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
        alert('Could not update exercise.');
      }
    });
  }

  showModal() {
    this.refs.modal.show();
  }

  hideModal() {
    this.refs.modal.hide();
  }

  saveExerciseData() {
    // TODO add validation e.g. max length for name

    let data = this.state.arr.slice();
    let index = this.clickedExerciseIndex;
    let exercise = data[index];
    
    exercise.name = this.refs.exerciseName.value;
    exercise.points = this.refs.exercisePoints.value;
    exercise.text = this.refs.exerciseText.value;

    data[index] = exercise; 


    const exerciseId = exercise._id;
    const name = exercise.name;
    const text = exercise.text;
    const points = parseInt(exercise.points);
    updateExercise.call({exerciseId, name, text, points}, (err) => {
      if (err) {
        console.log(err);
      
        /* eslint-disable no-alert */
        alert('Could not update exercise.');
      }
    });

    this.hideModal();
  }

  render() {
    
    function renderItem(data, index) {
      return (
        <SortableItem key={index} className="dynamic-item" sortData={data}>
          {data.name}
          <span className="delete"
            onMouseDown={this.handleRemoveElement.bind(this, index)}
          >&times;</span>
          <span className="delete"
            onMouseDown={this.handleUpdateElement.bind(this, index)}
          > upravit</span>
        </SortableItem>
      );
    }

    let modalStyle = {
      padding: '20px',
      height: '500px'
    };

    const { arr: exercises, formExerciseData: exercise } = this.state;
    
    if (exercises.length === 0) {
      return (
        <div className="no-exercises">Zatial tu nie sú žiadne cvičenia.</div>
      )
    }

    return (
      <div className="dynamic-demo">
        <Sortable key={this._sortableKey} onSort={this.handleSort.bind(this)}>
          {this.state.arr.map(renderItem, this)}
        </Sortable>

        <Modal ref="modal" contentStyle={modalStyle}>
          <h2>Upraviť cvičenie</h2>
          <label for="exerciseName">Názov:</label>
          <input type="text" name="exerciseName" ref="exerciseName" defaultValue={exercise.name}/>
          <label for="exerciseText">Body:</label>
          <input type="text" name="exercisePoints" ref="exercisePoints" defaultValue={exercise.points}/>
          <label for="exercisePoints">Text:</label>
          <textarea rows="8" cols="50" ref="exerciseText" defaultValue={exercise.text}/>
          <br/>
          <button className="btn-primary" onClick={this.saveExerciseData.bind(this)}>Uložiť zmeny</button>
        </Modal>
      </div>
    );
  }
}

