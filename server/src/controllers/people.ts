import express from 'express';
import { addNewPerson, displayPersonWithWishesAndEntries, findPeopleByName, updatePerson } from '../services/peopleService';
import { PersonAttributes, RequestWithToken } from '../types';
import { ControllerError } from '../utils/customError';
import { logger } from '../utils/logger';
import { authenticate } from '../utils/middleware';
import { validateToString } from '../utils/validators';
import { checkReadPermission, checkWritePermission } from '../utils/checkPermission';
import { toNewPerson } from '../utils/apiValidators';
const router = express.Router();

router.use(authenticate);

router.get('/', (req: RequestWithToken, res, next) => {
  try {
    checkReadPermission('people', req.permissions);
  } catch (error) {
    next(error);
    return;
  }
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

router.get('/:id', (req: RequestWithToken, res, next) => {
  try {
    checkReadPermission('people', req.permissions);
  } catch (error) {
    next(error);
    return;
  }
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

router.post('/', (req: RequestWithToken, res, next) => {
  try {
    checkWritePermission('people', req.permissions);
  } catch (error) {
    next(error);
    return;
  }
  let person: PersonAttributes;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    person = toNewPerson(req.body);
  } catch (error) {
    next(new ControllerError(400, 'request didn\'t include a valid person'));
    return;
  }
  addNewPerson(person)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      next(error);
    });
});

router.put('/:id', (req: RequestWithToken, res, next) => {
  // check that user is allowed to make changes to person
  try {
    checkWritePermission('people', req.permissions);
  } catch (error) {
    next(error);
    return;
  }
  // create person object with new name & address
  let person: PersonAttributes;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    person = toNewPerson(req.body);
    person.id = parseInt(req.params.id);
  } catch (error) {
    next(new ControllerError(400, 'invalid request'));
    return;
  }
  // if user has priviledges and person could be parsed
  updatePerson(person)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      next(error);
    });
});

export default router;
