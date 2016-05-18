import React from 'react';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Sortable from 'react-anything-sortable';

import { insertModel } from '../../api/models/methods.js';
import ModelsList from '../components/AdminModelsList.jsx';

export default class AdminModelsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAddModel() {
    insertModel.call((err) => {
      if (err) {
        
        /* eslint-disable no-alert */
        alert('Could not create model.');
      }
    });
  }
  

  render() {
    const models = this.props.models;
    console.log(models);
    return (
      <div>
        <h2>Modely áut</h2>
        <h5>Zoznam získaných modelov</h5>

        <ModelsList models={models} />
      </div>
    );
  }
}

AdminModelsPage.contextTypes = {
  router: React.PropTypes.object,
};

AdminModelsPage.propTypes = {
  models: React.PropTypes.array,
};

AdminModelsPage.defaultProps = {
  models: []
};