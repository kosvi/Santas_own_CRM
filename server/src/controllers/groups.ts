import express from 'express';
const router = express.Router();
import { getAllGroupsWithPermissions } from '../services/groupService';

router.get('/', (_req, res) => {
  getAllGroupsWithPermissions()
    .then(groups => {
      res.json(groups);
    })
    .catch(error => {
      console.log(error);
    });
});

export default router;