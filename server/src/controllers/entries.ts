import express from 'express';
import { getEntriesByPersonId } from '../services/entryService';
const router = express.Router();

router.get('/', (_req, res) => {
  getEntriesByPersonId(1)
    .then(response => {
      console.log(response.count);
      res.json(response.rows);
    })
    .catch(error => {
      console.error(error);
    });
});

export default router;