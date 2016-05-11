import { Meteor } from 'meteor/meteor';
import { Lections } from '../../api/lections/lections.js';
import { createContainer } from 'meteor/react-meteor-data';
import AdminLectionPage from '../pages/AdminLectionPage.jsx';

export default createContainer(({ params: { id } }) => {
  const exercisesHandle = Meteor.subscribe('exercises.inLection', id);
  const loading = !exercisesHandle.ready();
  const lection = Lections.findOne(id);
  const lectionExists = !loading && !!lection;
  console.log(lection);
  console.log(loading);
  return {
    loading,
    lection,
    lectionExists,
    exercises: lectionExists ? lection.exercises().fetch() : [],
  };
}, AdminLectionPage);
