import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';
import { mapToPostViewModelUtil } from '../mappers/map-to-post-view-model.util';

export async function getPostHandler(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const post =  await postsRepository.findById(id);

    if (!post) {
      res
          .status(HttpStatus.NotFound)
          .send(createErrorMessages([{field: 'id', message: 'Post not found'}]));

      return;
    }
    const postViewModel = mapToPostViewModelUtil(post);
    res.send(postViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}