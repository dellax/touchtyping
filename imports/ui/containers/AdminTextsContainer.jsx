import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import AdminTextsPage from '../pages/AdminTextsPage.jsx';
import { Texts } from '../../api/texts/texts.js';

export default createContainer(() => {
  // dont need to subcribe, already had in app container
  const texts = Texts.find({}, { sort: { createdAt: 1 } }).fetch();
  return {
  	texts
  };
}, AdminTextsPage);