import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ModelsPage from '../pages/ModelsPage.jsx';
import { Models } from '../../api/models/models.js';

export default createContainer(({ params: { id } }) => { 
 
  const user = Meteor.user();
  const models = Models.find( { points: { $lte: user.points } } ).fetch();
  
  return {
  	user,
    models
  };
}, ModelsPage);
