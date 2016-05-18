import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ModelsPage from '../pages/ModelsPage.jsx';
import { Models } from '../../api/models/models.js';

export default createContainer(({ params: { id } }) => { 
  const models = Models.find();
  const user = Meteor.user();
  console.log(user);
  return {
    models
  };
}, ModelsPage);
