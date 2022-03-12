import express from 'express';
import { authenticate } from '../utils/middleware';
const router = express.Router();

router.use(authenticate);

export default router;