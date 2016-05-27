import React from 'react';
import Modal from 'boron/DropModal';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';

import { 
  updateText, 
  removeText } from '../../api/texts/methods.js';
  

export default class AdminTextsList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      arr: props.texts,
      formTextData: {
        _id: '',
        name: '',
        text: ''
      }
    };
  }

  componentWillReceiveProps(props) {
    let texts = [...props.texts];
    this.setState({
      arr: texts
    });
  }


  handleUpdateElement(index) {
    let data = this.state.arr.slice();
    this.clickedTextIndex = index;
    let clickedTextlData = {...data[index]};
    this.setState({formTextData: clickedTextlData});
    
    this.showModal();
  }

  handleRemoveElement(index) {
    const texts = this.state.arr;
    const textId = texts[index]._id;
    removeText.call({textId}, (err) => {
      if (err) {
        console.log(err);
        /* eslint-disable no-alert */
        alert('Could not remove text.');
      }
    });
  }

  showModal() {
    this.refs.modal.show();
  }

  hideModal() {
    this.refs.modal.hide();
  }

  saveTextData() {
    // TODO add validation e.g. max length for name

    let data = this.state.arr.slice();
    let index = this.clickedTextIndex;
    let textEntry = data[index];
    
    textEntry.name = this.refs.textName.value;
    textEntry.text = this.refs.textText.value;
  
    data[index] = textEntry; 

    const textId = textEntry._id;
    const name = textEntry.name;
    const text = textEntry.text;
    updateText.call({textId, name, text}, (err) => {
      if (err) {
        /* eslint-disable no-alert */
        alert('Could not update text.');
      }
    });

    this.hideModal();
  }

  render() {
    
    function renderItem(data, index) {
      return (
        <div className="model" key={data._id}>
          <span className="name">Názov: {data.name}</span>
          <div className="model-buttons">
            <span className="delete"
              onMouseDown={this.handleRemoveElement.bind(this, index)}
            >&times;</span>
            <span className="delete"
              onMouseDown={this.handleUpdateElement.bind(this, index)}
            > upravit</span>
          </div>
        </div>
       
      );
    }

    let modalStyle = {
      padding: '20px',
      height: '500px'
    };

    const { arr: texts, formTextData: text } = this.state;
    
    if (texts.length === 0) {
      return (
        <div className="no-exercises">Zatial tu nie sú žiadne texty.</div>
      )
    }

    return (
      <div className="dynamic-demo">
        <div className="admin-models">
          {this.state.arr.map(renderItem, this)}
        </div>

        <Modal ref="modal" contentStyle={modalStyle}>
          <h2>Upraviť text</h2>
          <label for="textName">Názov:</label>
          <input type="text" name="textName" ref="textName" defaultValue={text.name}/>
          <label for="textText">Text:</label>
          <input type="text" name="textText" ref="textText" defaultValue={text.text}/>
          <br/>
          <button className="btn-primary" onClick={this.saveTextData.bind(this)}>Uložiť zmeny</button>
        </Modal>
      </div>
    );
  }
}

