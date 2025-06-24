import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';
import { postsRepository } from '../../repositories/posts.repository';

export async function deletePostHandler(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const post = await postsRepository.findById(id);

    if (!post) {
      res
          .status(HttpStatus.NotFound)
          .send(
              createErrorMessages([{ message: 'Post not found', field: 'id' }]),
          );
      return;
    }
    await postsRepository.delete(id);
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown)
  {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}