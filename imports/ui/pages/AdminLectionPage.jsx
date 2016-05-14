import React from 'react';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Sortable from 'react-anything-sortable';

import { insertExercise } from '../../api/exercises/methods.js';
import { updateLection } from '../../api/lections/methods.js';
import ExercisesList from '../components/AdminExercisesList.jsx';

export default class AdminLectionPage extends React.Component {
  constructor(props) {
    super(props);
    this.order = 0;
  }

  handleAddExercise() {
    const lectionId = this.props.lection._id;
    this.order++;
    let order = this.order;

    const exerciseId = insertExercise.call({lectionId, order}, (err) => {
      if (err) {
      
        /* eslint-disable no-alert */
        alert('Could not create exercise.');
      }
    });
  }

  saveLection() {
    // TODO maybe check input
    const lectionId = this.props.lection._id;
    const name = this.refs.lectionName.value;

    updateLection.call({lectionId, name}, (err) => {
      if (err) {
        console.log(err);
      
        /* eslint-disable no-alert */
        alert('Could not update lection.');
      }
    });
  }

  render() {
    const { lection, lectionExists, loading, exercises } = this.props;

    if (loading) {
      return <div> Loading</div>;
    }

    return (
      <div>
        <h2>Pridať novú lekciu</h2>
        <label for="lectionName">Názov lekcie:</label>
        <input type="text" name="lectionName" ref="lectionName"defaultValue={lection.name}/>
        <h5>Zoznam cvičení k lekcii</h5>

        <button onClick={this.handleAddExercise.bind(this)}>Pridať cvičenie</button>
        <ExercisesList exercises={exercises} />

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