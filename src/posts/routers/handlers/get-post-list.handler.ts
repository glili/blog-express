import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';
import { mapToPostViewModelUtil } from '../mappers/map-to-post-view-model.util';
import { HttpStatus } from '../../../core/types/http-statuses';

export async function getPostListHandler(req: Request, res: Response) {
  try {
    const posts = await postsRepository.findAll();

    const postViewModels = posts.map(mapToPostViewModelUtil);
    res.send(postViewModels);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}