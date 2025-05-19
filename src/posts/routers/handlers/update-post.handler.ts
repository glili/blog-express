import { Request, Response } from 'express';
import { PostInput } from '../../dto/post.input';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { postsRepository } from '../../repositories/posts.repository';

export function updatePostHandler(
  req: Request<{ id: string }, {}, PostInput>,
  res: Response,
) {
  const id = parseInt(req.params.id);
  const post = postsRepository.findById(id);

  if (!post) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{ field: 'id', message: 'Post not found' }]),
      );
    return;
  }

  postsRepository.update(id, req.body);
  res.sendStatus(HttpStatus.NoContent);
}