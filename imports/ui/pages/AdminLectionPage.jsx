import React from 'react';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Sortable from 'react-anything-sortable';
import ExerciseItem from '../components/ExerciseItem.jsx';

import { insertExercise } from '../../api/exercises/methods.js';
import LectionsList from '../components/AdminLectionsList.jsx';

export default class AdminLectionPage extends React.Component {
  constructor(props) {
    super(props);
    const exercises = props.exercises;
    let exerciseData = {
      name: 'Pismena a b c d',
      points: 0,
      text: 'sdkfjslf sdkfjslfj dskfjl'
    }
    let exerciseData2 = {
      name: 'Pismena dsfsfsdf',
      points: 0,
      text: 'sdkfjslf sdkfjslfj dskfjl'
    }
    this.state = {
      arr: exercises,
      formExerciseData: {
        _id: '',
        name: '',
        text: '',
        points: 0
      }
    };
    this._sortableKey = 0;
  }

  handleSort(sortedArray) {
    this._sortableKey++;
    this.setState({
      arr: sortedArray
    });
  }

  handleAddExercise() {
    this._sortableKey++;
    const lectionId = this.props.lection._id;
    const order = this.state.arr.length;


    const exerciseId = insertExercise.call({lectionId, order}, (err) => {
      if (err) {
        console.log(err);
      
        /* eslint-disable no-alert */
        alert('Could not create exercise.');
      }
    });
    console.log(exerciseId);

    const exerciseData = {
      _id: exerciseId,
      name: 'Nove cvicenie',
      text: '',
      body: 0
    }
    
  }

  handleRemoveElement(index) {
    const newArr = this.state.arr.slice();
    newArr.splice(index, 1);
    this._sortableKey++;

    this.setState({
      arr: newArr
    });
  }

  handleUpdateElement(index) {
    this._sortableKey++;
    let data = this.state.arr.slice();
    let clickedExerciseData = {...data[index], index};

    console.log(data);
    this.setState({
      formExerciseData: clickedExerciseData
    });
    this.showModal();
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
    let exerciseData = this.state.formExerciseData;
    exerciseData.name = this.refs.exerciseName.value;
    exerciseData.points = this.refs.exercisePoints.value;
    exerciseData.text = this.refs.exerciseText.value;

    let index = exerciseData.index;

    data[index] = exerciseData; 
    this.setState({
      arr: data
    })

    this.hideModal();
  }

  saveLection() {

  }

  render() {
    const { lection, lectionExists, loading, exercises } = this.props;

    if (loading) {
      return <div> Loading</div>;
    }

    const exercise = this.state.formExerciseData;

    return (
      <div>
        <h2>Pridať novú lekciu</h2>
        <label for="lectionName">Názov lekcie:</label>
        <input type="text" name="lectionName" ref="lectionName"defaultValue={lection.name}/>
        <h5>Zoznam cvičení k lekcii</h5>

       
        <button onClick={this.handleAddExercise.bind(this)}>Pridať cvičenie</button>
        <LectionsList exercises={exercises} />

        <button className="btn-primary" onClick={this.saveLection.bind(this)}>Uložiť zmeny</button>

        
      </div>
    );
  }
}

AdminLectionPage.propTypes = {
  lection: React.PropTypes.object,
  exercises: React.PropTypes.array,
  loading: React.PropTypes.bool,
  lectionExists: React.PropTypes.bool,
};