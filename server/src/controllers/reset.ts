import express from 'express';
import Models from '../models';
import { UserAttributes } from '../types';
import users from '../data/users';
import { addData, resetDB } from '../services/resetService';
import { runMigration, sequelize } from '../utils/db';
const router = express.Router();

router.get('/foo', (_req, res) => {
  resetDB()
    .catch(error => console.log(error));
  res.send('ok!');
});

router.get('/addusers', (_req, res) => {
  addData()
    .then((returnValue) => {
      console.log('addData returned ', returnValue);
      res.json(returnValue);
    })
    .catch((error) => {
      console.log(error);
      res.send('failure');
    });
});

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

router.get('/r', (_req, res) => {
  runMigration('down').catch((error) => console.log(error));
  res.send('ok!');
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