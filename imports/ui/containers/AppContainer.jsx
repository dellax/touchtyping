import { Meteor } from 'meteor/meteor';
// XXX: Session
import { Session } from 'meteor/session';
import { Lections } from '../../api/lections/lections.js';
import { Lists } from '../../api/lists/lists.js';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../layouts/App.jsx';

export default createContainer(() => {
  const lectionsHandle = Meteor.subscribe('lections.all');
  const publicHandle = Meteor.subscribe('lists.public');
  const privateHandle = Meteor.subscribe('lists.private');
  return {
    user: Meteor.user(),
    loading: !(publicHandle.ready() && privateHandle.ready() && lectionsHandle.ready()),
    connected: Meteor.status().connected,
    lists: Lists.find({ $or: [
      { userId: { $exists: false } },
      { userId: Meteor.userId() },
    ] }).fetch(),
  };
}, App);
