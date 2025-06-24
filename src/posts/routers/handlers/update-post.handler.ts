import { Request, Response } from 'express';
import { PostInput } from '../../dto/post.input';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';
import { postsRepository } from '../../repositories/posts.repository';

export async function updatePostHandler(
  req: Request<{ id: string }, {}, PostInput>,
  res: Response,
) {
  try {
    const id = req.params.id;
    const post = postsRepository.findById(id);

    if (!post) {
      res
          .status(HttpStatus.NotFound)
          .send(
              createErrorMessages([{ message: 'Post not found', field: 'id' }]),
          );
      return;
    }

    await postsRepository.update(id, req.body);
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}