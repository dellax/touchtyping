import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import LectionPage from '../pages/LectionPage.jsx';
import { Exercises } from '../../api/exercises/exercises.js';

export default createContainer(({ params: { id } }) => { 
  const exercise = Exercises.findOne(id);

  return {
    exercise
  };
}, LectionPage);
