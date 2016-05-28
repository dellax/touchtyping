import { Meteor } from 'meteor/meteor';

Meteor.publish("users.data", function () {
    return Meteor.users.find({}, {
    	fields: { 
    		'username': 1, 
    		'pointsLections': 1, 
    		'pointsGames': 1, 
    		'pointsLastGame': 1,
    		'defaultModel': 1 
    	}
    });
});