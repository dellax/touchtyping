import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import { insert } from '../../api/lections/methods.js';

export default class AdminLectionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.createNewLection = this.createNewLection.bind(this);
  }

  componentWillReceiveProps({ loading, children }) {
   
  }

  createNewLection() {
    const { router } = this.context;
    const lectionId = insert.call((err) => {
      if (err) {
        console.log(err);
        router.push('/');
        /* eslint-disable no-alert */
        alert('Could not create lection.');
      }
    });
    
    router.push(`/administracia/lekcie/upravit/${ lectionId }`);
  }

  render() {
    
    return (
      <div>
        <button className="btn-primary" onClick={this.createNewLection}>Pridať novú lekciu</button>
      </div>
    );
  }
}

AdminLectionsPage.contextTypes = {
  router: React.PropTypes.object,
};