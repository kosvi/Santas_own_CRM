import express from 'express';
import { login } from '../services/loginService';
import { LoginObject, toNewLoginObject } from '../utils/apiValidators';
import { logger } from '../utils/logger';
import { ControllerError } from '../utils/customError';
const router = express.Router();

router.post('/', (req, res, next) => {
  let loginObject: LoginObject | undefined;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    loginObject = toNewLoginObject(req.body);
  } catch (error) {
    logger.logError(error);
    next(new ControllerError(400, 'invalid request'));
  }
  if (loginObject) {
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

export default router;