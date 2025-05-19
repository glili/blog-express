import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';

export function getPostListHandler(req: Request, res: Response) {
  const posts = postsRepository.findAll();
  res.send(posts);
}