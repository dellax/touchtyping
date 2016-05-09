import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Lists } from '../../api/lists/lists.js';
import { Todos } from '../../api/todos/todos.js';

// if the database is empty on server start, create some sample data.
// TODO ...
Meteor.startup(() => {
  if (Lists.find().count() === 0) {
    var users = [
      {username: "tony123", name: "Normal", email: "normal@example.com", roles: []},
      {username: "test123", name: "Viewer", email: "view@example.com", roles: []},
      {username: "herrison", name: "Manageer", email: "manage@example.com", roles: []},
      {username: "admin", name: "Admin", email: "admin@example.com", roles: ['admin']}
    ];

    users.forEach((user) => {
      var id;

      id = Accounts.createUser({
        email: user.email,
        username: user.username,
        password: "test",
        profile: {firstName: user.name}
      });

      if (user.roles.length > 0) {
        // Need _id of existing user record so this call must come
        // after `Accounts.createUser` or `Accounts.onCreate`
        Roles.addUsersToRoles(id, user.roles);
      }
    });
    const data = [
      {
        name: 'Meteor Principles',
        items: [
          'Data on the Wire',
          'One Language',
          'Database Everywhere',
          'Latency Compensation',
          'Full Stack Reactivity',
          'Embrace the Ecosystem',
          'Simplicity Equals Productivity',
        ],
      },
      {
        name: 'Languages',
        items: [
          'Lisp',
          'C',
          'C++',
          'Python',
          'Ruby',
          'JavaScript',
          'Scala',
          'Erlang',
          '6502 Assembly',
        ],
      },
      {
        name: 'Favorite Scientists',
        items: [
          'Ada Lovelace',
          'Grace Hopper',
          'Marie Curie',
          'Carl Friedrich Gauss',
          'Nikola Tesla',
          'Claude Shannon',
        ],
      },
    ];

    let timestamp = (new Date()).getTime();

    data.forEach((list) => {
      const listId = Lists.insert({
        name: list.name,
        incompleteCount: list.items.length,
      });

      list.items.forEach((text) => {
        Todos.insert({
          listId,
          text,
          createdAt: new Date(timestamp),
        });

        timestamp += 1; // ensure unique timestamp.
      });
    });
  }
});
