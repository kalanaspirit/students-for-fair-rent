// @deno-types="npm:@types/express"
import { Router, Request, Response } from 'npm:express';
import { User } from '../db/models/user.ts';
import mongoose from 'npm:mongoose';

const userRoutes = Router();

userRoutes.post('/create', async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    studentId,
    upi,
    isAnonymous,
    emailAddress,
    hallOfResidence,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !studentId ||
    !upi ||
    !emailAddress ||
    !hallOfResidence
  ) {
    return res
      .status(400)
      .send(
        '`firstName`, `lastName`, `studentId`, `upi`, `emailAddress`, and `hallOfResidence` are required fields'
      );
  }

  try {
    await new User({
      firstName,
      lastName,
      studentId,
      upi,
      isAnonymous,
      emailAddress,
      hallOfResidence,
    }).save();
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(500).send('field was invalid');
    } else if (err.code == 11000) {
      return res.status(400).send('user already exists');
    } else {
      console.error(err);
      return res.status(500).send('failed to create user');
    }
  }
  return res.status(200).send('successfully created user');
});

export default userRoutes;
