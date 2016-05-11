import { Meteor } from 'meteor/meteor';
// XXX: Session
import { Session } from 'meteor/session';
import { Lections } from '../../api/lections/lections.js';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../layouts/App.jsx';

export default createContainer(() => {
  const lectionsHandle = Meteor.subscribe('lections.all');
  return {
    user: Meteor.user(),
    loading: !(lectionsHandle.ready()),
    connected: Meteor.status().connected
  };
}, App);
