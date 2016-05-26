import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import StatisticsPage from '../components/TouchType/Statistics.jsx';
import { Statistics } from '../../api/statistics/statistics.js';
import { Exercises } from '../../api/exercises/exercises.js';

export default createContainer(({ params: { id } }) => { 
  const stats = Statistics.findOne(id);
  const exercise = Exercises.findOne(stats.exerciseId);
  const olderStats = Statistics.find(
  	{ userId: Meteor.userId(), exerciseId: exercise._id }, 
  	{ sort: { createdAt: -1 }, skip: 1, limit: 2 }
  ).fetch();
  console.log(olderStats);
  // here we can load last 3 statistics from this exercise
  return {
    stats,
    olderStats,
    exercise
  };
}, StatisticsPage);
