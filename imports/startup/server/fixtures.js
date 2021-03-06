import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Lections } from '../../api/lections/lections.js';
import { Exercises } from '../../api/exercises/exercises.js';
import { Models } from '../../api/models/models.js';
import { Texts } from '../../api/texts/texts.js';
import { def0, def1, def2, def3, dodge, jeep, lambo, police } from './car-models.js';

// if the database is empty on server start, create some sample data.
// TODO ...
Meteor.startup(() => {
  if (Lections.find().count() === 0) {
    var users = [
      {username: "tony123", name: "Normal", pointsLections: 0, pointsGames: 1000, email: "normal@example.com", roles: []},
      {username: "test123", name: "Viewer", pointsLections: 400, pointsGames: 1000, email: "test@example.com", roles: []},
      {username: "herrison", name: "Manageer", pointsLections: 666, pointsGames: 1000, email: "manage@example.com", roles: []},
      {username: "admin", name: "Admin", pointsLections: 2000, pointsGames: 3321, email: "admin@example.com", roles: ['admin']}
    ];

    users.forEach((user) => {
      var id;

      id = Accounts.createUser({
        email: user.email,
        username: user.username,
        pointsLections: user.pointsLections,
        pointsGames: user.pointsGames,
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
        order: 0,
        exercises: [
          {
            name: 'Pismena aa bb',
            text: 'aaaa bbbb aaaa bbbb',
            points: 0,
            order: 0
          },
          {
            name: 'Text k lekcii',
            text: 'What suffering will have to be endured before the workers realize that? It was from a man in Arizona.',
            points: 100,
            order: 1
          }
        ],
      },
      {
        name: 'Lekcia 2',
        order: 1,
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
        order: lection.order,
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

    const models = [
      { name: 'Model zakladny', image: def0, points: 0 },
      { name: 'Model zakladny', image: def1, points: 0 },
      { name: 'Model zakladny', image: def2, points: 0 },
      { name: 'Model zakladny', image: def3, points: 0 },
      { name: 'Model dodge', image: dodge, points: 300 },
      { name: 'Model jeep', image: jeep, points: 500 },
      { name: 'Model lamborghini', image: lambo, points: 670 },
      { name: 'Model police', image: police, points: 1000 }
    ];

    models.forEach((model) => {
      Models.insert({
        name: model.name,
        image: model.image,
        points: model.points,
        createdAt: new Date(timestamp)
      });

      timestamp += 1;
    });

    const textsData = [
      { name: 'Text 1', text: 'Contrary to the feminist cant, there are many things we can learn from men\'s perspective about life and personal identity. To refuse to learn anything that could prove beneficial to yourself is a working definition of stupid.' },
      { name: 'Text 2', text: 'With forty-six Chinese, fourteen Japanese, eighteen Mesican, and only two Thai restaurants, Atlanta was a city still characterized by "all-American" food.' },
      { name: 'Text 3', text: 'In the capital of the Sunbelt South, the quiet revolution of immigration and food continues to upset and redefine the meanings of local, regional, and global identity.' },
      { name: 'Text 4', text: 'Typing competitions provided another test of the Qwerty keyboard. These competitions are somewhat underplayed in the conventional history. They involved many different machines, with various manufacturers claiming to hold the speed record.' },
    ];

    textsData.forEach((text) => {
      Texts.insert({
        name: text.name,
        text: text.text,
        createdAt: new Date(timestamp)
      });

      timestamp += 1;
    });
  }
});
