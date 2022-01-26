import express from 'express';
import { getLatestEntries } from '../services/entryService';
import { validateToString } from '../utils/validators';
const router = express.Router();

router.get('/', (req, res, next) => {
  let limit: string;
  if (req.query.limit) {
    limit = validateToString(req.query.limit);
  } else {
    // We can set this to anything we want as long as it doesn't parse int. 
    // if parseInt return NaN and we call getLatestEntries with NaN, it's going to use default value
    limit = '';
  }
  getLatestEntries(parseInt(limit))
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      next(error);
    });
});

export default router;