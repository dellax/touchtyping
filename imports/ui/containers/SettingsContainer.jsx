import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import SettingsPage from '../pages/SettingsPage.jsx';

export default createContainer(() => {
  // TODO
  //const todosHandle = Meteor.subscribe('todos.inList', id);
  //const loading = !todosHandle.ready();
  //const list = Lists.findOne(id);
  //const listExists = !loading && !!list;
  return {
  	user: Meteor.user(),
  };
}, SettingsPage);