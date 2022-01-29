import express from 'express';
import { displayPersonWithWishesAndEntries, findPeopleByName } from '../services/peopleService';
import { ControllerError } from '../utils/customError';
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

router.get('/:id', (req, res, next) => {
  let id: number;
  try {
    id = parseInt(req.params.id);
  } catch (error) {
    id = 0;
    next(new ControllerError(400, 'malformed id given'));
  }
  if (isNaN(id)) {
    next(new ControllerError(400, 'malformed id given'));
  }
  displayPersonWithWishesAndEntries(id)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      next(error);
    });
});

export default router;
