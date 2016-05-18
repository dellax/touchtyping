import { Meteor } from 'meteor/meteor';
// XXX: Session
import { Session } from 'meteor/session';
import { Lections } from '../../api/lections/lections.js';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../layouts/App.jsx';

export default createContainer(() => {
	const modelsHandle = Meteor.subscribe('models.all');
	const gamesHandle = Meteor.subscribe('games.all');
  const lectionsHandle = Meteor.subscribe('lections.all');
  const exercisesHandle = Meteor.subscribe('exercises.all');
  return {
    user: Meteor.user(),
    loading: !(modelsHandle.ready() && gamesHandle.ready() && lectionsHandle.ready() && exercisesHandle.ready()),
    connected: Meteor.status().connected
  };
}, App);
