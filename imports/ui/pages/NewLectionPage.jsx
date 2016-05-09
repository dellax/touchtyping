import React from 'react';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import { Tabbordion, Panel } from 'react-tabbordion';
import TouchTypeLearning from '../components/TouchType/TouchTypeLearning.jsx';

// TODO zmazat po vylepseni
import Statistics from '../components/TouchType/Statistics.jsx';


export default class ListPage extends React.Component {
  constructor(props) {
    super(props);
    
  }

  

  render() {
    


    return (
      <div className="container">
        <h2>Pridať novú lekciu</h2>
        <label for="name">Názov lekcie:</label>
        <input type="text" name="name" ref="name" placeholder=""/>
      </div>
    );
  }
}
