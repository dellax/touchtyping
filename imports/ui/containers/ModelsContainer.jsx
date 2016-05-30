import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ModelsPage from '../pages/ModelsPage.jsx';
import { Models } from '../../api/models/models.js';

export default createContainer(({ params: { id } }) => { 
 
  const user = Meteor.user();
  const modelsOwned = Models.find( { points: { $lte: user.pointsGames } } ).fetch();
  const modelsNotOwned = Models.find( { points: { $gt: user.pointsGames } } ).fetch();
  
  return {
  	user,
    modelsOwned,
    modelsNotOwned
  };
}, ModelsPage);
