import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import AdminLectionsPage from '../pages/AdminLectionsPage.jsx';
import { Lections } from '../../api/lections/lections.js';

export default createContainer(() => {
  // dont need to subcribe, already had in app container
  const lections = Lections.find().fetch();
  return {
  	lections
  };
}, AdminLectionsPage);