import React from 'react';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Sortable from 'react-anything-sortable';
import Modal from 'boron/DropModal';
import ExerciseItem from '../components/ExerciseItem.jsx';


export default class ListPage extends React.Component {
  constructor(props) {
    super(props);
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
      arr: [exerciseData, exerciseData2],
      formExerciseData: {
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

  handleAddElement() {
    this._sortableKey++;
    const exerciseSampleData = {
      name: 'Nove cvicenie',
      text: '',
      body: 0
    }
    this.setState({
      arr: this.state.arr.concat(exerciseSampleData)
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
    console.log(this.props);

    if (!lectionExists) {
      return <NotFoundPage/>;
    }
    
    function renderItem(data, index) {
      return (
        <ExerciseItem key={index} className="dynamic-item" sortData={data}>
          {data.name}
          <span className="delete"
            onMouseDown={this.handleRemoveElement.bind(this, index)}
          >&times;</span>
          <span className="delete"
            onMouseDown={this.handleUpdateElement.bind(this, index)}
          > upravit</span>
        </ExerciseItem>
      );
    }

    let contentStyle = {
      padding: '20px',
      height: '500px'
    };

    const exercise = this.state.formExerciseData;

    return (
      <div>
        <h2>Pridať novú lekciu</h2>
        <label for="lectionName">Názov lekcie:</label>
        <input type="text" name="lectionName" ref="lectionName"defaultValue={lection.name}/>
        <h5>Zoznam cvičení k lekcii</h5>

        <div className="dynamic-demo">
          <button onClick={this.handleAddElement.bind(this)}>Pridať cvičenie</button>
          <Sortable key={this._sortableKey} onSort={this.handleSort.bind(this)}>
            {this.state.arr.map(renderItem, this)}
          </Sortable>
        </div>

        <button className="btn-primary" onClick={this.saveLection.bind(this)}>Uložiť zmeny</button>

        <Modal ref="modal" contentStyle={contentStyle}>
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