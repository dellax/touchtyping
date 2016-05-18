import React from 'react';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Sortable from 'react-anything-sortable';

import { setDefaultModel } from '../../api/users/methods.js';

export default class ModelsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSetDefaultModel(modelId) {
    setDefaultModel.call({modelId}, (err) => {
      if (err) {

        /* eslint-disable no-alert */
        alert('Could not update default model.');
      }
    });
  }
  

  render() {
    const models = this.props.models;
    const user = this.props.user;
    
    return (
      <div className="user-models">
        <h2>Modely áut</h2>
        Kliknutím na model, nastavíte model ako predvolený.
        <h5>Zoznam získaných modelov</h5>

        {models.map((model) => {
          const style = {};
          if (model._id === user.defaultModel) {
            style.backgroundColor = '#e6ccff';
          }
          return (
            <div className="model" onClick={this.handleSetDefaultModel.bind(this, model._id)} style={style}>
              <img width="88" height="47" src={model.image} alt="model"/>
              <span className="name">Názov modelu: {model.name}</span>
              <span className="points">Potrebné body: {model.points}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

ModelsPage.contextTypes = {
  router: React.PropTypes.object,
};

ModelsPage.propTypes = {
  models: React.PropTypes.array,
};

ModelsPage.defaultProps = {
  models: []
};