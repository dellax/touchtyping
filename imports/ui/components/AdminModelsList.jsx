import React from 'react';
import Modal from 'boron/DropModal';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Sortable from 'react-anything-sortable';
import SortableItem from './SortableItem.jsx';

import { 
  updateModel, 
  removeModel } from '../../api/models/methods.js';
  

export default class AdminModelsList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      arr: props.models,
      formModelData: {
        _id: '',
        name: '',
        image: '',
        points: 0
      }
    };
    this._sortableKey = 0;
  }

  componentWillReceiveProps(props) {
    let models = [...props.models];
    this.setState({
      arr: models
    });
  }


  handleUpdateElement(index) {
    let data = this.state.arr.slice();
    this.clickedModelIndex = index;
    let clickedModelData = {...data[index]};
    this.setState({formModelData: clickedModelData});
    
    this.showModal();
  }

  handleRemoveElement(index) {
    const models = this.state.arr;
    const modelId = models[index]._id;
    removeModel.call({modelId}, (err) => {
      if (err) {
        console.log(err);
        /* eslint-disable no-alert */
        alert('Could not remove model.');
      }
    });
  }

  showModal() {
    this.refs.modal.show();
  }

  hideModal() {
    this.refs.modal.hide();
  }

  saveModelData() {
    // TODO add validation e.g. max length for name

    let data = this.state.arr.slice();
    let index = this.clickedModelIndex;
    let model = data[index];
    
    model.name = this.refs.modelName.value;
    model.image = this.refs.modelImage.value;
    model.points = this.refs.modelPoints.value;

    // TODO check if model has image 


    data[index] = model; 


    const modelId = model._id;
    const name = model.name;
    const image = model.image;
    const points = parseInt(model.points);
    updatemodel.call({modelId, name, image, points}, (err) => {
      if (err) {
      
        /* eslint-disable no-alert */
        alert('Could not update model.');
      }
    });

    this.hideModal();
  }

  render() {
    
    function renderItem(data, index) {
      return (
        <div>
          {data.name}
          <span className="delete"
            onMouseDown={this.handleRemoveElement.bind(this, index)}
          >&times;</span>
          <span className="delete"
            onMouseDown={this.handleUpdateElement.bind(this, index)}
          > upravit</span>
        </div>
      );
    }

    let modalStyle = {
      padding: '20px',
      height: '500px'
    };

    const { arr: models, formModelData: model } = this.state;
    
    if (models.length === []) {
      return (
        <div className="no-exercises">Zatial tu nie sú žiadne modely aut.</div>
      )
    }

    return (
      <div className="dynamic-demo">
        
        {this.state.arr.map(renderItem, this)}
       

        <Modal ref="modal" contentStyle={modalStyle}>
          <h2>Upraviť cvičenie</h2>
          <label for="modelName">Názov:</label>
          <input type="text" name="exerciseName" ref="modelName" defaultValue={model.name}/>
          <label for="modelImage">Obrázok:</label>
          <input type="file" name="modelImage" ref="modelImage" />
          <label for="modelPoints">Body:</label>
          <input type="text" name="modelPoints" ref="modelPoints" defaultValue={model.points}/>
          <br/>
          <button className="btn-primary" onClick={this.saveModelData.bind(this)}>Uložiť zmeny</button>
        </Modal>
      </div>
    );
  }
}
