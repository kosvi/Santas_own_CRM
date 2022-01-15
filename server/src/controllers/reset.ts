import express from 'express';
import Models from '../models';
import { UserAttributes } from '../types';
import users from '../data/users';
import { runMigration, sequelize } from '../utils/db';
const router = express.Router();

router.get('/adduser', (_req, res) => {
  const newUsers = users.map((u: UserAttributes) => {
    return Models.User.create(u)
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
});

router.get('/', (_req, res) => {
  runMigration('down').then(function () {
    sequelize.drop().catch((error) => { console.log(error); });
  }).then(function () {
    runMigration('up').catch((error) => { console.log(error); });
  })
    .catch((error) => { console.log(error); });
  res.send('Migrations ok!');
});

router.get('/drop', (_req, res) => {
  runMigration('down').then(function () {
    console.log('Migration.down completed');
  }).catch((error) => { console.log(error); });
  res.send('Migrations cancelled');
});

export default router;