import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import AdminModelsPage from '../pages/AdminModelsPage.jsx';
import { Models } from '../../api/models/models.js';

export default createContainer(() => {
  // dont need to subcribe, already had in app container
  const models = Models.find({}, { sort: { points: 1 } }).fetch();
  return {
  	models
  };
}, AdminModelsPage);