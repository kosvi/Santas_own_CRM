import express from 'express';
import { findPeopleByName } from '../services/peopleService';
import { logger } from '../utils/logger';
import { validateToString } from '../utils/validators';
const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.query.name) {
    // ok, we have a search string
    const search = validateToString(req.query.name);
    findPeopleByName(search).then(people => {
      res.json(people);
    })
      .catch(error => {
        logger.logError(error);
        next(error);
      });
  } else {
    // no keyword given, return all?!?!?!
    res.status(400).json({ error: 'you must give a keyword to search people' });
  }
});

export default router;