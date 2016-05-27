import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import RankingsPage from '../pages/RankingsPage.jsx';

export default createContainer(() => { 
	const user = Meteor.user();
  const rankings = Meteor.users.find({}, { sort: { points: -1 }, limit: 8 }).fetch();
  
  return {
  	user,
  	rankings
  };
}, RankingsPage);
