import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Lists } from '../../api/lists/lists.js';
import { Todos } from '../../api/todos/todos.js';
import { Lections } from '../../api/lections/lections.js';
import { Exercises } from '../../api/exercises/exercises.js';

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
        name: 'Lekcia 1',
        exercises: [
          {
            name: 'Pismena aa bb',
            text: 'aaaa bbbb aaaa bbbb',
            points: 0,
            order: 0
          },
          {
            name: 'Pismena cc dd',
            text: 'cccc dddd cccc dddd',
            points: 0,
            order: 1
          }
        ],
      },
      {
        name: 'Lekcia 2',
        exercises: [
          {
            name: 'Pismena aa bb',
            text: 'aaaa bbbb aaaa bbbb',
            points: 0,
            order: 0
          },
          {
            name: 'Pismena cc dd',
            text: 'cccc dddd cccc dddd',
            points: 0,
            order: 1
          }
        ],
      }
    ];

    let timestamp = (new Date()).getTime();

    data.forEach((lection) => {
      const lectionId = Lections.insert({
        name: lection.name,
        createdAt: new Date(timestamp)
      });

      lection.exercises.forEach((exercise) => {
        Exercises.insert({
          lectionId,
          name: exercise.name,
          text: exercise.text,
          points: exercise.points,
          order: exercise.order,
          createdAt: new Date(timestamp)
        });

        timestamp += 1; // ensure unique timestamp.
      });
    });
  }
});
