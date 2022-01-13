import express from 'express';
import { User } from './models';
import { UserAttributes } from './types';
import users from './data/users';
import { runMigration, sequelize } from './utils/db';
const app = express();

app.use(express.static('build'));

app.get('/api', (_req, res) => {
  res.json({ msg: 'Hello World' });
});

app.get('/api/adduser', (_req, res) => {
  const newUsers = users.map((u: UserAttributes) => {
    return User.create(u)
      .then((n) => { return n; })
      .catch((error) => { console.log(error); });
  });
  console.log(newUsers[0]);
  Promise.all(newUsers)
    .then((nu) => {
      res.json(nu);
    })
    .catch((error) => {
      console.log(error);
    });
  /*  User.create({ username: 'foo', password: 'bar', name: 'foobar' })
      .then((user) => { res.json(user); })
      .catch((error) => { console.log(error); });
      */
});

app.get('/api/reset', (_req, res) => {
  runMigration(true).then(function () {
    sequelize.drop().catch((error) => { console.log(error); });
  }).then(function () {
    runMigration(false).catch((error) => { console.log(error); });
  })
    .catch((error) => { console.log(error); });
  res.send('Migrations ok!');
});

app.get('/api/version', (_req, res) => {
  res.send('OK!');
});

export default app;