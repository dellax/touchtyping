import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import StatisticsPage from '../components/TouchType/Statistics.jsx';
import { Statistics } from '../../api/statistics/statistics.js';

export default createContainer(({ params: { id } }) => { 
  const stats = Statistics.findOne(id);
  // here we can load last 3 statistics from this exercise
  return {
    stats
  };
}, StatisticsPage);
