import React from 'react';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Sortable from 'react-anything-sortable';
import Modal from 'boron/DropModal';
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

  showModal() {
    this.refs.modal.show();
  }

  hideModal() {
    this.refs.modal.hide();
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

    let contentStyle = {
      padding: '20px',
      height: '500px'
    };

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
        <button onClick={this.showModal.bind(this)}>Open</button>
        <Modal ref="modal" contentStyle={contentStyle}>
          <h2>Upraviť cvičenie</h2>
          <label for="name">Názov:</label>
          <input type="text" name="name" ref="name" placeholder=""/>
          <label for="name">Text:</label>
          <textarea rows="8" cols="50"/>
          <br/>
          <button className="btn-primary" onClick={this.hideModal.bind(this)}>Uložiť zmeny</button>
        </Modal>
      </div>
    );
  }
}