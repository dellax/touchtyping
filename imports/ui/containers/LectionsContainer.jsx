import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import LectionsPage from '../pages/LectionsPage.jsx';
import { Lections } from '../../api/lections/lections.js';

export default createContainer(() => { 
  const lections = Lections.find({}, { sort: { order: 1 } }).fetch();
  const lectionsWithExercises = [];

  let index = 0;
  lections.forEach((lection) => {
  	lection.index = index;
  	let exercises = lection.exercises().fetch();
  	lectionsWithExercises.push({lection, exercises});
  	index++;
  });

  return {
    lectionsWithExercises,
  };
}, LectionsPage);
