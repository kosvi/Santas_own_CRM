import express from 'express';
import { changeGroup, login } from '../services/loginService';
import { LoginObject, toNewLoginObject, toSwitchGroupFields } from '../utils/apiValidators';
import { logger } from '../utils/logger';
import { ControllerError } from '../utils/customError';
const router = express.Router();

router.post('/', (req, res, next) => {
  let loginObject: LoginObject | undefined;
  // if request payload can't be validated to LoginObject (= username & password), we will throw ControllerError
  // and let middleware handle the error and response
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    loginObject = toNewLoginObject(req.body);
  } catch (error) {
    logger.logError(error);
    next(new ControllerError(400, 'invalid request'));
  }
  // we really don't need this if since undefined isn't really an option here any more
  if (loginObject) {
    // result should ALWAYS contain valid object, since all failures should throw ControllerError
    // for .catch to pass on to middleware
    login(loginObject)
      .then(result => {
        if (result) {
          res.json(result);
        } else {
          throw new ControllerError(500, 'login failed for unknown reason');
        }
      })
      .catch(error => {
        logger.logError(error);
        next(error);
      });
  }
});

router.put('/', (req, res, next) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const payload = toSwitchGroupFields(req.body);
  changeGroup(payload.groupId, payload.token)
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json({ error: 'no permission of malformed content' });
      }
    })
    .catch(error => {
      next(error);
    });
});

export default router;