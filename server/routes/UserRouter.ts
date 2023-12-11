/* eslint-disable import/no-anonymous-default-export */
import express, { Request, Response } from 'express';
const router = express.Router();
import { getUser } from '../controllers/userController';

export default (db: any) => {
  router.get('/:userId', (req: Request, res: Response) => getUser(req, res, db));

  return router;
};
