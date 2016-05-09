import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import AdminPage from '../pages/AdminPage.jsx';

export default createContainer(() => {
  // TODO
  //const todosHandle = Meteor.subscribe('todos.inList', id);
  //const loading = !todosHandle.ready();
  //const list = Lists.findOne(id);
  //const listExists = !loading && !!list;
  return {

  };
}, AdminPage);
