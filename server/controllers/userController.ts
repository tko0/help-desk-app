import { Request, Response } from 'express';
import UserModel from '../models/UserModel';

export const getUser = async (req: Request, res: Response, db: any) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findByPk(Number(userId));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};