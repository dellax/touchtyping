import { Meteor } from 'meteor/meteor';
import { Lection } from '../../api/lections/lections.js';
import { createContainer } from 'meteor/react-meteor-data';
import LectionPage from '../pages/LectionPage.jsx';

export default createContainer(({ params: { id } }) => {
  const exercisesHandle = Meteor.subscribe('exercises.inLection', id);
  const loading = !exercisesHandle.ready();
  const lection = Lections.findOne(id);
  const lectionExists = !loading && !!lection;
  return {
    loading,
    lection,
    lectionExists,
    exercises: lectionExists ? lection.exercises().fetch() : [],
  };
}, ListPage);
