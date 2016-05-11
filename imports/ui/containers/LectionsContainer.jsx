import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import LectionsPage from '../pages/LectionsPage.jsx';
import { Lections } from '../../api/lections/lections.js';

export default createContainer(() => { 
  const lections = Lections.find().fetch();
  const lectionsWithExercises = [];

  lections.forEach((lection) => {
  	let name = lection.name;
  	let id = lection._id;
  	let exercises = lection.exercises().fetch();
  	lectionsWithExercises.push({id, name, exercises});
  });

  return {
    lectionsWithExercises,
  };
}, LectionsPage);
