import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Games } from '../../api/games/games.js';
import { Players } from '../../api/players/players.js';
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

function getElapsedTimeInSeconds(gameCreatedDate, playerFinishedDate) {
  return Math.abs(moment(playerFinishedDate).diff(gameCreatedDate, 'seconds'));
}

function getPointsForPlayersToAdd(players, gameCreatedDate) {
  if (players.length === 0) return [];

  if (players[0].finishedDate === null) {
    // if noone finished game
    const res = players.map((player) => {
      return {_id: player.userId, pointsToAdd: -30};
    });
    return res;
  }
  
  let averagePoints;
  let sumPoints = 0;
  let bestTime = getElapsedTimeInSeconds(gameCreatedDate, players[0].finishedDate);
  
  players.forEach((player) => {
    sumPoints += player.points;
  });

  averagePoints = Math.round(sumPoints / players.length);

  let bonus = 30;
  const res = players.map((player) => {
    if (player.finishedDate === null) return {_id: player.userId, pointsToAdd: -30};

    let pointsToAdd = 0;  
    const playerTime = getElapsedTimeInSeconds(gameCreatedDate, player.finishedDate);
    ;
    pointsToAdd = averagePoints+bonus - player.points;
    if (bonus >= 10) { 
      bonus -= 10;
    }

    if (pointsToAdd < 0) {
      pointsToAdd = Math.round(pointsToAdd * (1 - bestTime / playerTime));
    } else {
      pointsToAdd = Math.round(pointsToAdd * (bestTime / playerTime));
    }

    return { _id: player.userId, pointsToAdd };
  });
  
  return res;
}

Meteor.startup(() => {
  const gameAge = 2; // set gameAge in minutes, after which game will be checked
  const checkInterval = 1000;
  Meteor.setInterval(() => {
    const now = moment().subtract(gameAge, 'minutes').toDate();
    const games = Games.find({ 
      hasStarted: true,
      createdAt: { $lte: now }
    }).fetch();
    
    // each game older then gameAge ...
    games.forEach((game) => {
      const players = game.playersByTime().fetch();
      const pointsToAdd = getPointsForPlayersToAdd(players, game.createdAt);
      //return;
      pointsToAdd.forEach((user) => {
        // add points for user and notify
        
        Meteor.users.update(user._id, {
          $inc: { pointsGames: user.pointsToAdd }
        });

        // notify user about that
        let notification = {};
        if (user.pointsToAdd >= 0) {
          notification = {
            userId: user._id,
            name: 'Získal si nové body',
            text: `Za odohranú hru si získal ${user.pointsToAdd} bodov. Gratulujeme.`,
            read: false
          }
        } else {
          notification = {
            userId: user._id,
            name: 'Prišiel si o body',
            text: `Za odohranú hru si bohužial prišiel o ${user.pointsToAdd} bodov.`,
            read: false
          }
        }
        
        Notifications.insert(notification);
      })

      // remove players and game...
      players.forEach((player) => {
        Players.remove(player._id);
      });

      Games.remove(game._id);
    });
  }, checkInterval);
});