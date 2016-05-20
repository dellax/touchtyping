import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import TouchTypeLearning from '../components/TouchType/TouchTypeLearning.jsx';
import { Session } from 'meteor/session';


export default class LectionPage extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const exercise = this.props.exercise;
    
    return (
      <div>
        <TouchTypeLearning text={exercise.text} exercise={exercise} />
      </div>
    );
  }
}


