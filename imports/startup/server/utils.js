import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Games } from '../../api/games/games.js';
import moment from 'moment';

Accounts.onCreateUser((options, user) => {
  user.defaultModel = null;
  user.points = 0;
  if (options.defaultModel) user.defaultModel = options.defaultModel;
  if (options.points) user.points = options.points;
  return user;
});


// check if games started, every second
Meteor.startup(() => {
    Meteor.setInterval(() => {
    	const games = Games.find({ 
    		hasStarted: false,
    		playersCount: { $gte: 2 }
    	}).fetch();
    	let now = moment()
	    games.forEach((game) => {
	      let gameCreatedAt = moment(game.createdAt);
	      if (now.diff(gameCreatedAt, 'seconds') >= 10) {
	        Games.update(game._id, {
	          $set: { 
	            hasStarted: true
	          },
	        });
	      }
	    });
    }, 1000);
});