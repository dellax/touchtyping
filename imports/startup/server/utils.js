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
  const gameAge = 10; // set gameAge in seconds, after which game will be checked
  const checkInterval = 1000;
  Meteor.setInterval(() => {
    const now = moment().subtract(gameAge, 'seconds').toDate();

  	const games = Games.find({ 
  		hasStarted: false,
  		playersCount: { $gte: 2 },
      createdAt: { $lte: now }
  	}).fetch();

    games.forEach((game) => { 
      Games.update(game._id, {
        $set: { 
          hasStarted: true
        },
      }); 
    });
  }, checkInterval);
});

Meteor.startup(() => {
  const gameAge = 1; // set gameAge in minutes, after which game will be checked
  const checkInterval = 1000;
  Meteor.setInterval(() => {
    const now = moment().subtract(gameAge, 'minutes').toDate();
    const games = Games.find({ 
      hasStarted: true,
      createdAt: { $lte: now }
    }).fetch();
    
    // each game older then gameAge ...
    games.forEach((game) => {
      //console.log(game._id);
    });
  }, checkInterval);
});