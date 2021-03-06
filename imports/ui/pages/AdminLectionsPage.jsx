import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import { insert } from '../../api/lections/methods.js';
import LectionsList from '../components/AdminLectionsList.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


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
        router.push('/');
        /* eslint-disable no-alert */
        alert('Could not create lection.');
      }
    });
    
    router.push(`/administracia/lekcie/upravit/${ lectionId }`);
  }

  render() {
    const { lections } = this.props;
    return (
      <div>
        <h2>Lekcie</h2>
        <RaisedButton
          label="Pridať novú lekciu"
          labelPosition="after"
          primary={true}
          icon={<ContentAdd />}
          onClick={this.createNewLection}
        />
        <h5>Zoznam lekcii</h5>
        <LectionsList lections={lections} />
      </div>
    );
  }
}

AdminLectionsPage.contextTypes = {
  router: React.PropTypes.object,
};