import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Statistics } from '../../api/statistics/statistics.js';
import SettingsPage from '../pages/SettingsPage.jsx';

export default createContainer(() => {
  const user = Meteor.user();
  return {
  	user,
  };
}, SettingsPage);