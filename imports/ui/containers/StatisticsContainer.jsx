import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import StatisticsPage from '../components/TouchType/Statistics.jsx';
import { Statistics } from '../../api/statistics/statistics.js';
import { Exercises } from '../../api/exercises/exercises.js';

export default createContainer(({ params: { id } }) => { 
  const stats = Statistics.findOne(id);
  const exercise = Exercises.findOne(stats.exerciseId);
  console.log(exercise);
  // here we can load last 3 statistics from this exercise
  return {
    stats,
    exercise
  };
}, StatisticsPage);
