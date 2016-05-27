import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import TextsList from '../components/AdminTextsList.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { insertText } from '../../api/texts/methods.js';


export default class AdminTextsPage extends React.Component {
  constructor(props) {
    super(props);
    this.createNewText = this.createNewText.bind(this);
  }

  componentWillReceiveProps({ loading, children }) {
   
  }

  createNewText() {
    const textId = insertText.call((err) => {
      if (err) {
        router.push('/');
        /* eslint-disable no-alert */
        alert('Could not create text.');
      }
    });
  }

  render() {
    const texts = this.props.texts;
    return (
      <div>
        <h2>Texty k hrám</h2>
        <RaisedButton
          label="Pridať nový text"
          labelPosition="after"
          primary={true}
          icon={<ContentAdd />}
          onClick={this.createNewText}
        />
        <h5>Zoznam textov</h5>
        <TextsList texts={texts} />
      </div>
    );
  }
}

AdminTextsPage.contextTypes = {
  router: React.PropTypes.object,
};