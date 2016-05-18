import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default () => {
	const Schema = {};
	Schema.UserProfile = new SimpleSchema({
	  firstName: {
	    label: "Meno",
	    type: String,
	    regEx: /^[a-zA-Z-]{2,25}$/,
	    optional: true
	  },
	  lastName: {
	    label: "Priezvisko",
	    type: String,
	    regEx: /^[a-zA-Z]{2,25}$/,
	    optional: true
	  },
	  birthday: {
	    label: "Dátum narodenia",
	    type: Date,
	    optional: true
	  },
	  gender: {
	    label: "Pohlavie",
	    type: String,
	    allowedValues: ['Muž', 'Žena'],
	    optional: true
	  },
	  organization : {
	    label: "Organizácia",
	    type: String,
	    regEx: /^[a-z0-9A-z .]{3,30}$/,
	    optional: true
	  },
	  website: {
	    label: "Webstránka",
	    type: String,
	    regEx: SimpleSchema.RegEx.Url,
	    optional: true
	  },
	  bio: {
	    label: "O mne",
	    type: String,
	    optional: true
	  }
	});

	Schema.User = new SimpleSchema({
	  username: {
	    type: String,
	    regEx: /^[a-z0-9A-Z_]{3,15}$/
	  },
	  emails: {
	    type: [Object],
	    // this must be optional if you also use other login services like facebook,
	    // but if you use only accounts-password, then it can be required
	    optional: true
	  },
	  "emails.$.address": {
	    type: String,
	    regEx: SimpleSchema.RegEx.Email
	  },
	  "emails.$.verified": {
	    type: Boolean
	  },
	  createdAt: {
	    type: Date
	  },
	  profile: {
	    label: "Základné informácie",
	    type: Schema.UserProfile,
	    optional: true
	  },
	  services: {
	    type: Object,
	    optional: true,
	    blackbox: true
	  },
	  points: {
	    type: Number,
	    defaultValue: 0
	  },
	  defaulModel: {
	  	type: String,
	  	optional: true
	  },
	  // Add `roles` to your schema if you use the meteor-roles package.
	  // Option 1: Object type
	  // If you specify that type as Object, you must also specify the
	  // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
	  // Example:
	  // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
	  // You can't mix and match adding with and without a group since
	  // you will fail validation in some cases.

	  // Option 2: [String] type
	  // If you are sure you will never need to use role groups, then
	  // you can specify [String] as the type
	  roles: {
	    type: [String],
	    optional: true
	  },
	  // user-status package
	  status: {
	    type: Object,
	    optional: true,
	    blackbox: true
	  }
	});

	Meteor.users.attachSchema(Schema.User);
}
