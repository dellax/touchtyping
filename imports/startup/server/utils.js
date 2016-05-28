import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Games } from '../../api/games/games.js';
import { Notifications } from '../../api/notifications/notifications.js';
import moment from 'moment';

Accounts.onCreateUser((options, user) => {
  user.defaultModel = null;
  user.pointsLections = 0;
  user.pointsGames = 1000;
  user.pointsLastGame = 0;
  if (options.defaultModel) user.defaultModel = options.defaultModel;
  if (options.pointsLections) user.pointsLections = options.pointsLections;
  if (options.pointsGames) user.pointsGames = options.pointsGames;
  const notification = {
    userId: user._id,
    name: 'Ďakujeme za registráciu',
    text: 'Teraz môžeš začať získavať body plnením lekcií, alebo hraním hier.',
    read: false
  }
  Notifications.insert(notification);
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