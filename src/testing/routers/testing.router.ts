import { Router, Request, Response } from 'express';
import { blogCollection, postCollection } from '../../db/mongo.db';
import { HttpStatus } from '../../core/types/http-statuses';

export const testingRouter = Router({});


testingRouter.delete('/all-data', async (req: Request, res: Response) => {
  // truncate db
  await Promise.all([
      blogCollection.deleteMany({}),
      postCollection.deleteMany({}),
  ])
  res.sendStatus(HttpStatus.NoContent);
});