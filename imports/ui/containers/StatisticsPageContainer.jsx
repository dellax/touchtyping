
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Statistics } from '../../api/statistics/statistics.js';
import { Exercises } from '../../api/exercises/exercises.js';
import StatisticsPage from '../pages/StatisticsPage.jsx';

export default createContainer(() => {
	const user = Meteor.user();
  const statisticsList = Statistics.find({ userId: user._id }, { sort: { createdAt: -1 } }).fetch();
  const statisticWithExercises = statisticsList.map((statistics) => {
  	const exercise = Exercises.findOne(statistics.exerciseId);
  	return {statistics, exercise};
  });
  return {
  	statisticWithExercises
  };
}, StatisticsPage);